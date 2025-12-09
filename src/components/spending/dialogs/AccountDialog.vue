<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from 'reka-ui';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: boolean;
  message: string | null | undefined;
}>();

const { t } = useI18n();

const emits = defineEmits(['update:modelValue', 'submit']);

const internalOpen = computed({
  get: () => props.modelValue,
  set: (v) => emits('update:modelValue', v),
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      internalOpen.value = false;
      isSignup.value = false;
      resetForm();
    }
  }
);

const isSignup = ref(false);

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const errors = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const resetForm = () => {
  formData.value = { email: '', password: '', confirmPassword: '' };
  errors.value = { email: '', password: '', confirmPassword: '' };
};

const toggleMode = () => {
  isSignup.value = !isSignup.value;
  resetForm();
};

const handleClose = () => {
  internalOpen.value = false;
  isSignup.value = false;
  resetForm();
};

const handleSubmit = () => {
  errors.value = { email: '', password: '', confirmPassword: '' };

  const email = formData.value.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.value.email = t('spending.validation.emailRequired');
  } else if (!emailRegex.test(email)) {
    errors.value.email = t('spending.validation.emailInvalid');
  }

  const password = formData.value.password;

  if (!password) {
    errors.value.password = t('spending.validation.passwordRequired');
  } else if (password.length < 6) {
    errors.value.password = t('spending.validation.passwordInvalid');
  }

  if (isSignup.value && password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = t('spending.validation.passwordsDoesNotMatch');
  }

  if (errors.value.email || errors.value.password || errors.value.confirmPassword) {
    return;
  }

  emits('submit', { ...formData.value, signup: isSignup.value });
};
</script>

<template>
  <Dialog v-model:open="internalOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {{ isSignup ? t('register') : t('login') }}
        </DialogTitle>
      </DialogHeader>
      <div
        v-if="message"
        class="rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive"
      >
        {{ message }}
      </div>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="email">{{ t('email') }}</Label>
          <Input id="email" type="email" v-model="formData.email" :class="errors.email ? 'border-destructive' : ''" />
          <p v-if="errors.email" class="text-sm text-destructive">
            {{ errors.email }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="password">{{ t('password') }}</Label>
          <Input
            id="password"
            type="password"
            v-model="formData.password"
            :class="errors.password ? 'border-destructive' : ''"
          />
          <p v-if="errors.password" class="text-sm text-destructive">
            {{ errors.password }}
          </p>
        </div>
        <div v-if="isSignup" class="grid gap-2">
          <Label for="confirm-password">{{ t('confirmPassword') }}</Label>
          <Input
            id="confirm-password"
            type="password"
            v-model="formData.confirmPassword"
            :class="errors.confirmPassword ? 'border-destructive' : ''"
          />
          <p v-if="errors.confirmPassword" class="text-sm text-destructive">
            {{ errors.confirmPassword }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex justify-end gap-2">
          <Button @click="handleClose" variant="outline">{{ t('cancel') }}</Button>
          <Button @click="handleSubmit">
            {{ isSignup ? t('register') : t('login') }}
          </Button>
        </div>
        <div class="text-center text-sm text-muted-foreground">
          {{ isSignup ? t('alreadyHaveAnAccount') : t('noAccount') }}
          <button class="font-medium text-primary hover:underline" @click="toggleMode">
            {{ isSignup ? t('login') : t('register') }}
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
