<script setup lang="ts">
import { Plus, Edit, Trash2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { computed, onMounted, ref } from 'vue';
import { ListItem } from '@/components/spending/types';
import { useMainStore } from '@/store';
import AddEditDialog from '@/components/spending/dialogs/AddEditDialog.vue';
import { auth, db } from '@/firebase';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { useToast } from '@/components/ui/toast/use-toast';
import { useI18n } from 'vue-i18n';

const store = useMainStore();
const { toast } = useToast();
const { t } = useI18n();
const isDialogOpen = ref(false);
const listItems = ref<ListItem[]>([]);
const selectedItem = ref<ListItem | null>(null);

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      fetchUserSpendingItems();
    } else {
      listItems.value = listItemsOffline.value;
    }
  });
});

const totalAmount = computed(() => {
  return listItems.value.reduce((sum, item) => sum + Number(item.amount), 0);
});

const totalIncrease = computed(() => {
  return listItems.value.reduce((sum, item) => sum + Number(item.increase), 0);
});

const listItemsOffline = computed<ListItem[]>(() => {
  const items = store.getSpendingItems ?? [];

  return Array.isArray(items) ? items : [];
});

const fetchUserSpendingItems = async () => {
  const user = auth.currentUser;

  if (!user) {
    listItems.value = listItemsOffline.value;

    return;
  }

  try {
    const recordsRef = collection(db, 'users', user.uid, 'spendingItems');
    const q = query(recordsRef, orderBy('createdAt', 'asc'));

    const snapshot = await getDocs(q);

    listItems.value = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title as string,
        amount: data.amount as number,
        increase: data.increase as number,
      } as ListItem;
    });
  } catch (error) {
    toast({
      variant: 'destructive',
      title: t('spending.errors.errorFetch'),
      description: t('spending.errors.tryAgain'),
    });

    listItems.value = [];
  }
};

const handleDialogOpen = (item?: ListItem) => {
  if (item) {
    selectedItem.value = { ...item };
  } else {
    selectedItem.value = null;
  }

  isDialogOpen.value = true;
};

const handleDelete = async (item: ListItem) => {
  store.deleteSpendingItem(item.id);

  const user = auth.currentUser;

  if (!user) {
    toast({
      variant: 'destructive',
      title: t('spending.errors.userNotFound'),
      description: t('spending.errors.localSave'),
    });

    listItems.value = listItems.value.filter((currentItem) => currentItem.id !== item.id);

    return;
  }

  const docRef = doc(db, 'users', user.uid, 'spendingItems', item.id);

  await deleteDoc(docRef);

  listItems.value = listItems.value.filter((currentItem) => currentItem.id !== item.id);
};

const handleIncrease = async (item: ListItem) => {
  item.amount += item.increase;
  store.editSpendingItem(item);
  await updateDocument(item);

  toast({
    title: t('spending.updateSuccess', { item: item.title }),
    description: t('spending.amountIncreased', { amount: item.amount }),
  });
};

const handleUpdate = async (item: ListItem) => {
  store.editSpendingItem(item);
  await updateDocument(item);

  isDialogOpen.value = false;

  const index = listItems.value.findIndex((i) => i.id === item.id);

  if (index !== -1) {
    listItems.value[index] = item;
  }

  toast({
    title: t('spending.updateSuccess', { item: item.title }),
    description: t('spending.dataUpdated'),
  });
};

const handleSave = async (item: ListItem) => {
  const user = auth.currentUser;

  if (!user) {
    toast({
      variant: 'destructive',
      title: t('spending.errors.userNotFound'),
      description: t('spending.errors.localSave'),
    });

    listItems.value.push(item);
    isDialogOpen.value = false;

    return;
  }

  const recordsRef = collection(db, 'users', user.uid, 'spendingItems');

  const docRef = await addDoc(recordsRef, {
    ...item,
    createdAt: serverTimestamp(),
  });

  item.id = docRef.id;

  isDialogOpen.value = false;

  toast({
    title: t('spending.newItemAdded'),
    description: item.title,
  });

  listItems.value.push(item);
};

const updateDocument = async (item: ListItem) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  const docRef = doc(db, 'users', user.uid, 'spendingItems', item.id);

  await updateDoc(docRef, {
    title: item.title,
    amount: item.amount,
    increase: item.increase,
    updatedAt: serverTimestamp(),
  });
};
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-3xl font-bold text-foreground">{{ t('spending.title') }}</h2>
    <p class="text-muted-foreground">{{ t('spending.description') }}</p>
  </div>
  <div class="space-y-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <p class="mb-1 text-sm text-muted-foreground">{{ t('spending.totalAmount') }}</p>
        <p class="text-3xl font-bold text-foreground">{{ totalAmount }}</p>
      </div>
      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <p class="mb-1 text-sm text-muted-foreground">{{ t('spending.totalMonthlyIncrease') }}</p>
        <p class="text-3xl font-bold text-success">+{{ totalIncrease }}</p>
      </div>
    </div>
    <div v-if="listItems.length > 0" class="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow class="border-border bg-muted/50">
            <TableHead class="font-semibold">{{ t('spending.name') }}</TableHead>
            <TableHead class="font-semibold">{{ t('spending.amount') }}</TableHead>
            <TableHead class="font-semibold">{{ t('spending.monthlyIncrease') }}</TableHead>
            <TableHead class="text-right font-semibold">{{ t('spending.actions') }}</TableHead>
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
                  {{ t('spending.add') }}
                </Button>
                <Button @click="handleDialogOpen(item)" size="sm" variant="outline" class="h-8 gap-1">
                  <Edit class="h-3.5 w-3.5" />
                  {{ t('spending.edit') }}
                </Button>
                <Button
                  @click="handleDelete(item)"
                  size="sm"
                  variant="outline"
                  class="h-8 gap-1 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                  {{ t('spending.delete') }}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <AddEditDialog
      v-model="isDialogOpen"
      :item="selectedItem"
      @emit-create-action="handleSave"
      @emit-update-action="handleUpdate"
    />
    <div class="mt-4 flex justify-end">
      <Button @click="handleDialogOpen(undefined)">{{ t('spending.new') }}</Button>
    </div>
  </div>
</template>
