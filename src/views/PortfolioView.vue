<script setup lang="ts">
import { DollarSign, PieChart, TrendingUp } from 'lucide-vue-next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-3xl font-bold text-foreground">Portfolio Overview</h2>
    <p class="text-muted-foreground">View and analyze your investment portfolio and asset allocation</p>
  </div>
  <div class="mb-8 grid gap-6 md:grid-cols-3">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Portfolio Value</CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">0.00</div>
        <p class="text-xs text-muted-foreground">No investments yet</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Asset Allocation</CardTitle>
        <PieChart class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">0 Assets</div>
        <p class="text-xs text-muted-foreground">Start building your portfolio</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Performance</CardTitle>
        <TrendingUp class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">0%</div>
        <p class="text-xs text-muted-foreground">Add investments to track</p>
      </CardContent>
    </Card>
  </div>
  <Card>
    <CardHeader>
      <CardTitle>Your Portfolio</CardTitle>
      <CardDescription> Start adding investments to build and track your portfolio </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <PieChart class="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 class="mb-2 text-lg font-semibold">No investments yet</h3>
        <p class="max-w-md text-muted-foreground">
          Begin your investment journey by adding your first asset to track your portfolio performance
        </p>
      </div>
    </CardContent>
  </Card>
</template>
