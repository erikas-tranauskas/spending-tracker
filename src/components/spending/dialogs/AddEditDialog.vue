<script setup lang="ts">
import { useMainStore } from '@/store';
import { PropType, ref, watch } from 'vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from 'reka-ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListItem } from '@/components/spending/types';

const store = useMainStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object as PropType<ListItem | null>,
    default: null,
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
      name: newValue?.title ? newValue.title : '',
      amount: newValue?.amount ? newValue.amount : undefined,
      increase: newValue?.increase ? newValue.increase : undefined,
    };
  }
);

watch(internalOpen, (value) => {
  errors.value = {
    name: '',
    amount: '',
    increase: '',
  };

  emit('update:modelValue', value);
});

const formData = ref<{ id: string; name: string; amount: number | undefined; increase: number | undefined }>({
  id: '',
  name: '',
  amount: undefined,
  increase: undefined,
});

const errors = ref({
  name: '',
  amount: '',
  increase: '',
});

const saveItem = async () => {
  errors.value = {
    name: '',
    amount: '',
    increase: '',
  };

  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required';
  }

  if (!formData.value.amount) {
    errors.value.amount = 'Amount is required';
  }

  if (!formData.value.increase) {
    errors.value.increase = 'Increase is required';
  }

  if (errors.value.name || errors.value.amount || errors.value.increase) {
    return;
  }

  const newItem: ListItem = {
    id: formData.value.id ?? Date.now(),
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
        <DialogTitle>{{ item ? 'Edit' : 'Add New Item' }}</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="formData.name" :class="errors.name ? 'border-destructive' : ''" />
          <p v-if="errors.name" class="text-sm text-destructive">
            {{ errors.name }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            v-model="formData.amount"
            :class="errors.amount ? 'border-destructive' : ''"
          />
          <p v-if="errors.amount" class="text-sm text-destructive">
            {{ errors.amount }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="increase">Increase</Label>
          <Input
            id="increase"
            type="number"
            v-model="formData.increase"
            :class="errors.increase ? 'border-destructive' : ''"
          />
          <p v-if="errors.increase" class="text-sm text-destructive">
            {{ errors.increase }}
          </p>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="internalOpen = false">Close</Button>
        <Button @click="saveItem">Save</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
