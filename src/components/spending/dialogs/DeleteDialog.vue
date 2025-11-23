<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListItem } from '@/components/spending/types';
import { useI18n } from 'vue-i18n';

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
});

const emit = defineEmits(['update:modelValue', 'emitConfirmAction']);

const internalOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalOpen.value = newValue;
  }
);

watch(internalOpen, (value) => {
  emit('update:modelValue', value);
});

const handleConfirm = async () => {
  emit('emitConfirmAction', props.item);
};
</script>

<template>
  <Dialog v-model:open="internalOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ t('spending.confirmation') }}</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <div>
            {{ t('spending.deletePrompt') }}
            <span class="font-semibold text-destructive">
              {{ item?.title }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="internalOpen = false">{{ t('buttons.close') }}</Button>
        <Button @click="handleConfirm">{{ t('buttons.confirm') }}</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
