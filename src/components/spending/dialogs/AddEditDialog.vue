<script setup lang="ts">
import { useMainStore } from '@/store';
import { PropType, ref, watch } from 'vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from 'reka-ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListItem } from '@/components/spending/types';
import { useI18n } from 'vue-i18n';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import type { Component } from 'vue';

const store = useMainStore();
const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object as PropType<ListItem | null>,
    default: null,
  },
  categories: {
    type: Array as PropType<{ value: string; label: string; icon: Component }[]>,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'emitCreateAction', 'emitUpdateAction']);

const internalOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalOpen.value = newValue;
  }
);

watch(
  () => props.item,
  (newValue) => {
    formData.value = {
      id: newValue?.id ? newValue.id : '',
      category: newValue?.category ? newValue.category : '',
      name: newValue?.title ? newValue.title : '',
      amount: newValue?.amount ? newValue.amount : undefined,
      increase: newValue?.increase ? newValue.increase : undefined,
    };
  }
);

watch(internalOpen, (value) => {
  errors.value = {
    category: '',
    name: '',
    amount: '',
    increase: '',
  };

  emit('update:modelValue', value);
});

const formData = ref<{
  id: string;
  category: string;
  name: string;
  amount: number | undefined;
  increase: number | undefined;
}>({
  id: '',
  category: '',
  name: '',
  amount: undefined,
  increase: undefined,
});

const errors = ref({
  category: '',
  name: '',
  amount: '',
  increase: '',
});

const saveItem = async () => {
  errors.value = {
    category: '',
    name: '',
    amount: '',
    increase: '',
  };

  if (!formData.value.category.trim()) {
    errors.value.category = t('spending.validation.categoryRequired');
  }

  if (!formData.value.name.trim()) {
    errors.value.name = t('spending.validation.nameRequired');
  }

  if (!formData.value.amount) {
    errors.value.amount = t('spending.validation.amountRequired');
  }

  if (!formData.value.increase) {
    errors.value.increase = t('spending.validation.increaseRequired');
  }

  if (errors.value.name || errors.value.amount || errors.value.increase) {
    return;
  }

  const newItem: ListItem = {
    id: formData.value.id ?? Date.now(),
    category: formData.value.category,
    title: formData.value.name,
    amount: formData.value.amount ?? 0,
    increase: formData.value.increase ?? 0,
  };

  const currentItems = Array.isArray(store.getSpendingItems) ? store.getSpendingItems : [];

  if (props.item) {
    store.editSpendingItem(newItem);
    emit('emitUpdateAction', newItem);
  } else {
    store.setSpendingItems([...currentItems, newItem]);
    emit('emitCreateAction', newItem);
  }
};
</script>

<template>
  <Dialog v-model:open="internalOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ item ? t('spending.edit') : t('spending.addNew') }}</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="category">{{ t('spending.category') }}</Label>
          <Select v-model="formData.category">
            <SelectTrigger id="category" :class="errors.category ? 'border-destructive' : ''">
              <SelectValue :placeholder="t('spending.category')" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="category in categories" :key="category.value" :value="category.value">
                  <div class="flex items-center gap-2">
                    <component :is="category.icon" class="h-4 w-4" />
                    <span>{{ category.label }}</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p v-if="errors.category" class="text-sm text-destructive">
            {{ errors.category }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="name">{{ t('spending.name') }}</Label>
          <Input
            id="name"
            v-model="formData.name"
            :class="errors.name ? 'border-destructive' : ''"
            :placeholder="t('spending.name')"
          />
          <p v-if="errors.name" class="text-sm text-destructive">
            {{ errors.name }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="amount">{{ t('spending.amount') }}</Label>
          <Input
            id="amount"
            type="number"
            v-model="formData.amount"
            :class="errors.amount ? 'border-destructive' : ''"
            :placeholder="t('spending.amount')"
          />
          <p v-if="errors.amount" class="text-sm text-destructive">
            {{ errors.amount }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="increase">{{ t('spending.increase') }}</Label>
          <Input
            id="increase"
            type="number"
            v-model="formData.increase"
            :class="errors.increase ? 'border-destructive' : ''"
            :placeholder="t('spending.increase')"
          />
          <p v-if="errors.increase" class="text-sm text-destructive">
            {{ errors.increase }}
          </p>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="internalOpen = false">{{ t('buttons.close') }}</Button>
        <Button @click="saveItem">{{ t('buttons.save') }}</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
