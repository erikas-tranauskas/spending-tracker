<script setup lang="ts">
import { Sun, Moon, House, Wallet, PieChart, LogInIcon, UserRoundIcon, LogOut } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useColorMode } from '@vueuse/core';
import type { Component } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AccountDialog from '@/components/spending/dialogs/AccountDialog.vue';
import { useAuth } from '@/composables/useAuth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase';

interface MenuItem {
  routeName: string;
  url: string;
  title: string;
  icon: Component;
}

const { open } = useSidebar();
const route = useRoute();
const { t } = useI18n();
const { user } = useAuth();
const mode = useColorMode();
const isAccountDialogOpen = ref(false);
const accountDialogMessage = ref<null | string>(null);

const menuItems: MenuItem[] = [
  { routeName: 'home', url: '/', title: t('menu.home'), icon: House },
  { routeName: 'spending', url: '/spending', title: t('menu.spending'), icon: Wallet },
  { routeName: 'portfolio', url: '/portfolio', title: t('menu.portfolio'), icon: PieChart },
];

const toggleTheme = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark';
};

const isActive = (item: MenuItem) => {
  return route.path === item.url;
};

const handleSubmit = (data: { email: string; password: string; confirmPassword: string; signup: boolean }) => {
  if (!data.signup) {
    login(data.email, data.password);
  } else {
    register(data.email, data.password);
  }
};

const register = async (email: string, password: string) => {
  // @todo add localstorage items to Firebase, ask for prompt
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      isAccountDialogOpen.value = false;
      accountDialogMessage.value = null;
    })
    .catch(() => {
      accountDialogMessage.value = t('registerFailed');
    });
};

const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      isAccountDialogOpen.value = false;
      accountDialogMessage.value = null;
    })
    .catch(() => {
      accountDialogMessage.value = t('loginFailed');
    });
};

const logout = async () => {
  const auth = getAuth();

  await signOut(auth);
};
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{{ t('navigation') }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menuItems" :key="item.title">
              <SidebarMenuButton as-child>
                <router-link
                  :key="item.title"
                  :to="item.url"
                  class="flex w-full items-center gap-2 rounded p-2 hover:bg-accent hover:text-accent-foreground"
                  :class="isActive(item) ? 'bg-accent text-accent-foreground' : ''"
                >
                  <component :is="item.icon" class="h-4 w-4" />
                  <span v-if="open">{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>{{ t('account') }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu v-if="!user">
            <SidebarMenuItem>
              <SidebarMenuButton @click="isAccountDialogOpen = true">
                <LogInIcon class="h-4 w-4" />
                <span v-if="open">{{ t('account') }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu v-if="user">
            <SidebarMenuItem>
              <SidebarMenuButton class="flex cursor-default items-center gap-2">
                <UserRoundIcon class="h-4 w-4" />
                <span class="truncate text-sm" v-if="open">{{ user.email }}</span>
              </SidebarMenuButton>
              <SidebarMenuButton @click="logout">
                <LogOut class="h-4 w-4" />
                <span v-if="open">{{ t('logout') }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenuItem>
        <SidebarMenuButton @click="toggleTheme">
          <template v-if="mode === 'dark'">
            <Sun class="h-4 w-4" />
            <span v-if="open">{{ t('lightMode') }}</span>
          </template>
          <template v-else>
            <Moon class="h-4 w-4" />
            <span v-if="open">{{ t('darkMode') }}</span>
          </template>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  </Sidebar>
  <AccountDialog v-model="isAccountDialogOpen" @submit="handleSubmit" :message="accountDialogMessage" />
</template>
