<script setup lang="ts">
import { Sun, Moon, House, Wallet, PieChart } from 'lucide-vue-next';
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
import { useRoute } from 'vue-router';

interface MenuItem {
  routeName: string;
  url: string;
  title: string;
  icon: Component;
}

const menuItems: MenuItem[] = [
  { routeName: 'home', url: '/', title: 'Home', icon: House },
  { routeName: 'spending', url: '/spending', title: 'Spending', icon: Wallet },
  { routeName: 'portfolio', url: '/portfolio', title: 'Portfolio', icon: PieChart },
];

const { open } = useSidebar();
const route = useRoute();

const mode = useColorMode();

const toggleTheme = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark';
};

const isActive = (item: MenuItem) => {
  return route.path === item.url;
};
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>WealthWise</SidebarGroupLabel>
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
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenuItem>
        <SidebarMenuButton @click="toggleTheme">
          <template v-if="mode === 'dark'">
            <Sun class="h-4 w-4" />
            <span v-if="open">Light Mode</span>
          </template>
          <template v-else>
            <Moon class="h-4 w-4" />
            <span v-if="open">Dark Mode</span>
          </template>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  </Sidebar>
</template>
