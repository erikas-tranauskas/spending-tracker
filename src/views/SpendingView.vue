<script setup lang="ts">
import { Plus, Edit, Trash2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { computed } from 'vue';
import { ListItem } from '@/components/spending/types';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/store';

const router = useRouter();
const store = useMainStore();

const listItems = computed<ListItem[]>(() => {
  const items = store.getSpendingItems ?? [];

  return Array.isArray(items) ? items : [];
});

const redirectToNewItemView = () => {
  router.push('/spending/new');
};

const redirectToItemView = (id: number) => {
  router.push(`/spending/edit/${id}`);
};

const handleDelete = (id: number) => {
  store.deleteSpendingItem(id);
};

const handleIncrease = (item: ListItem) => {
  item.amount += item.increase;

  store.editSpendingItem(item);
};
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-3xl font-bold text-foreground">Spending</h2>
    <p class="text-muted-foreground">View and manage your items with detailed information and actions</p>
  </div>
  <div class="space-y-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <p class="mb-1 text-sm text-muted-foreground">Total Amount</p>
        <p class="text-3xl font-bold text-foreground">100</p>
      </div>
      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <p class="mb-1 text-sm text-muted-foreground">Total Change</p>
        <p class="text-3xl font-bold text-success">+12</p>
      </div>
    </div>
    <div v-if="listItems.length > 0" class="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow class="border-border bg-muted/50">
            <TableHead class="font-semibold">Name</TableHead>
            <TableHead class="font-semibold">Amount</TableHead>
            <TableHead class="font-semibold">Increase</TableHead>
            <TableHead class="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="item in listItems"
            :key="item.id"
            className="border-border hover:bg-muted/30 transition-colors"
          >
            <TableCell class="font-medium">{{ item.title }}</TableCell>
            <TableCell>{{ item.amount }}</TableCell>
            <TableCell>
              <span class="font-medium text-success">
                {{ item.increase }}
              </span>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <Button @click="handleIncrease(item)" size="sm" variant="outline" class="h-8 gap-1">
                  <Plus class="h-3.5 w-3.5" />
                  Add
                </Button>
                <Button @click="redirectToItemView(item.id)" size="sm" variant="outline" class="h-8 gap-1">
                  <Edit class="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  @click="handleDelete(item.id)"
                  size="sm"
                  variant="outline"
                  class="h-8 gap-1 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
