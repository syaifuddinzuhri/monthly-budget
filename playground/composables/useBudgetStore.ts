export type BudgetType = 'income' | 'expense'

export interface BudgetTransaction {
  id: string
  title: string
  type: BudgetType
  category: string
  amount: number
  date: string
  account: string
  paymentMethod: string
  note?: string
  createdAt?: string
}

export interface RecurringExpense {
  id: string
  name: string
  amount: number
  category: string
  account: string
  dueDay: number
  active: boolean
  status: 'paid' | 'unpaid'
  startDate: string
  endDate?: string
}

export interface BudgetItem {
  category: string
  allocated: number
  used: number
  remaining: number
}

export interface AccountItem {
  id: string
  name: string
  type: string
  balance: number
}

export interface SavingsGoal {
  id: string
  name: string
  target: number
  saved: number
  dueDate: string
  color: string
}

const mockData = {
  accounts: [
    { id: 'acc-1', name: 'Bank BCA', type: 'Bank', balance: 8200000 },
    { id: 'acc-2', name: 'Tunai', type: 'Tunai', balance: 1400000 },
    { id: 'acc-3', name: 'Dana', type: 'Dompet digital', balance: 950000 },
  ],
  transactions: [
    { id: 'tx-1', title: 'Gaji Bulan Ini', type: 'income', category: 'Gaji', amount: 9500000, date: '2026-10-01', account: 'Bank BCA', paymentMethod: 'Transfer', note: 'Gaji Oktober', createdAt: '2026-10-01' },
    { id: 'tx-2', title: 'Belanja Bulanan', type: 'expense', category: 'Makanan', amount: 1450000, date: '2026-10-05', account: 'Tunai', paymentMethod: 'Tunai', note: 'Belanja kebutuhan rumah', createdAt: '2026-10-05' },
    { id: 'tx-3', title: 'Tagihan Listrik', type: 'expense', category: 'Utilitas', amount: 420000, date: '2026-10-07', account: 'Bank BCA', paymentMethod: 'Transfer', note: 'Tagihan Oktober', createdAt: '2026-10-07' },
    { id: 'tx-4', title: 'Desain Lepas', type: 'income', category: 'Pekerjaan lepas', amount: 2400000, date: '2026-10-12', account: 'Dana', paymentMethod: 'Dompet digital', note: 'Proyek identitas merek', createdAt: '2026-10-12' },
    { id: 'tx-5', title: 'Transportasi', type: 'expense', category: 'Transportasi', amount: 380000, date: '2026-10-15', account: 'Tunai', paymentMethod: 'Tunai', note: 'Bensin dan angkutan umum', createdAt: '2026-10-15' },
    { id: 'tx-6', title: 'Langganan Film', type: 'expense', category: 'Hiburan', amount: 120000, date: '2026-10-18', account: 'Bank BCA', paymentMethod: 'Kartu', note: 'Langganan film bulanan', createdAt: '2026-10-18' },
    { id: 'tx-7', title: 'Beli Sembako', type: 'expense', category: 'Belanja', amount: 560000, date: '2026-10-20', account: 'Tunai', paymentMethod: 'Tunai', note: 'Bahan kebutuhan rumah', createdAt: '2026-10-20' },
  ],
  recurringExpenses: [
    { id: 're-1', name: 'Internet', amount: 350000, category: 'Utilitas', account: 'Bank BCA', dueDay: 10, active: true, status: 'unpaid', startDate: '2026-09-10' },
    { id: 're-2', name: 'Langganan Spotify', amount: 75000, category: 'Hiburan', account: 'Bank BCA', dueDay: 12, active: true, status: 'paid', startDate: '2026-09-12' },
    { id: 're-3', name: 'Asuransi', amount: 500000, category: 'Tagihan', account: 'Bank BCA', dueDay: 15, active: false, status: 'unpaid', startDate: '2026-08-15', endDate: '2026-12-15' },
  ],
  monthlyBudget: [
    { category: 'Kebutuhan Pokok', allocated: 2500000, used: 1800000, remaining: 700000 },
    { category: 'Makanan', allocated: 1800000, used: 1450000, remaining: 350000 },
    { category: 'Transportasi', allocated: 800000, used: 380000, remaining: 420000 },
    { category: 'Utilitas', allocated: 1200000, used: 700000, remaining: 500000 },
    { category: 'Hiburan', allocated: 700000, used: 220000, remaining: 480000 },
    { category: 'Tagihan', allocated: 900000, used: 500000, remaining: 400000 },
    { category: 'Belanja', allocated: 1100000, used: 560000, remaining: 540000 },
  ],
  savingsGoals: [
    { id: 'sg-1', name: 'Dana Darurat', target: 15000000, saved: 8400000, dueDate: '2027-06-30', color: 'bg-emerald-500' },
    { id: 'sg-2', name: 'Liburan', target: 10000000, saved: 3500000, dueDate: '2027-02-28', color: 'bg-violet-500' },
    { id: 'sg-3', name: 'Belanja Rumah', target: 8000000, saved: 2400000, dueDate: '2027-04-15', color: 'bg-cyan-500' },
  ],
}

export const useBudgetStore = () => {
  const transactions = ref<BudgetTransaction[]>(mockData.transactions)
  const recurringExpenses = ref<RecurringExpense[]>(mockData.recurringExpenses)
  const accounts = ref<AccountItem[]>(mockData.accounts)
  const monthlyBudget = ref<BudgetItem[]>(mockData.monthlyBudget)
  const savingsGoals = ref<SavingsGoal[]>(mockData.savingsGoals)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

  const currentMonthLabel = computed(() =>
    new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date()))

  const totalIncome = computed(() =>
    transactions.value
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0))

  const totalExpense = computed(() =>
    transactions.value
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0))

  const totalBudget = computed(() =>
    monthlyBudget.value.reduce((sum, item) => sum + item.allocated, 0))

  const totalBudgetUsed = computed(() =>
    monthlyBudget.value.reduce((sum, item) => sum + item.used, 0))

  const remainingBudget = computed(() => totalBudget.value - totalBudgetUsed.value)

  const totalAccountBalance = computed(() =>
    accounts.value.reduce((sum, item) => sum + item.balance, 0))

  const balance = computed(() => totalIncome.value - totalExpense.value)

  const savingsRate = computed(() => {
    if (totalIncome.value === 0) return 0
    return (balance.value / totalIncome.value) * 100
  })

  const budgetSummary = computed(() =>
    monthlyBudget.value.map((item) => ({
      category: item.category,
      allocated: item.allocated,
      used: item.used,
      remaining: item.remaining,
      percent: item.allocated > 0 ? (item.used / item.allocated) * 100 : 0,
    })))

  const pendingRecurring = computed(() =>
    recurringExpenses.value.filter((item) => item.active && item.status === 'unpaid'))

  const recentTransactions = computed(() =>
    [...transactions.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8))

  const expenseByCategory = computed(() => {
    const map = new Map<string, number>()
    transactions.value.forEach((item) => {
      if (item.type === 'expense') {
        map.set(item.category, (map.get(item.category) || 0) + item.amount)
      }
    })
    return [...map.entries()].map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value)
  })

  const annualSummary = computed(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    const income = [7200000, 7900000, 8500000, 7800000, 9000000, 8200000, 9800000, 9300000, 9200000, 9500000, 8700000, 9900000]
    const expense = [5400000, 6000000, 6200000, 6100000, 6800000, 6500000, 7000000, 7100000, 6900000, 7400000, 6700000, 7600000]

    return months.map((month, index) => ({
      month,
      income: income[index],
      expense: expense[index],
      difference: income[index] - expense[index],
    }))
  })

  const addTransaction = async (payload: Omit<BudgetTransaction, 'id' | 'createdAt'>) => {
    const newItem: BudgetTransaction = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      amount: Number(payload.amount),
    }

    transactions.value = [newItem, ...transactions.value]
    return newItem
  }

  const deleteTransaction = async (id: string) => {
    transactions.value = transactions.value.filter((item) => item.id !== id)
  }

  const addRecurringExpense = (payload: Omit<RecurringExpense, 'id'>) => {
    const item: RecurringExpense = { ...payload, id: crypto.randomUUID() }
    recurringExpenses.value = [item, ...recurringExpenses.value]
    return item
  }

  const updateRecurringExpense = (id: string, payload: Omit<RecurringExpense, 'id'>) => {
    recurringExpenses.value = recurringExpenses.value.map((item) => item.id === id ? { ...item, ...payload } : item)
  }

  const deleteRecurringExpense = (id: string) => {
    recurringExpenses.value = recurringExpenses.value.filter((item) => item.id !== id)
  }

  const addSavingsGoal = (payload: Omit<SavingsGoal, 'id' | 'color'>) => {
    const colors = ['bg-emerald-500', 'bg-violet-500', 'bg-cyan-500', 'bg-amber-500', 'bg-rose-500']
    const item: SavingsGoal = { ...payload, id: crypto.randomUUID(), color: colors[savingsGoals.value.length % colors.length] }
    savingsGoals.value = [item, ...savingsGoals.value]
    return item
  }

  const updateSavingsGoal = (id: string, payload: Omit<SavingsGoal, 'id' | 'color'>) => {
    savingsGoals.value = savingsGoals.value.map((item) => item.id === id ? { ...item, ...payload } : item)
  }

  const deleteSavingsGoal = (id: string) => {
    savingsGoals.value = savingsGoals.value.filter((item) => item.id !== id)
  }

  const addAccount = (payload: Omit<AccountItem, 'id'>) => {
    const item: AccountItem = { ...payload, id: crypto.randomUUID() }
    accounts.value = [item, ...accounts.value]
    return item
  }

  const updateAccount = (id: string, payload: Omit<AccountItem, 'id'>) => {
    const previousName = accounts.value.find((item) => item.id === id)?.name
    accounts.value = accounts.value.map((item) => item.id === id ? { ...item, ...payload } : item)
    if (previousName && previousName !== payload.name) {
      transactions.value = transactions.value.map((item) => item.account === previousName ? { ...item, account: payload.name } : item)
      recurringExpenses.value = recurringExpenses.value.map((item) => item.account === previousName ? { ...item, account: payload.name } : item)
    }
  }

  const deleteAccount = (id: string) => {
    const deletedAccount = accounts.value.find((item) => item.id === id)
    const fallbackAccount = accounts.value.find((item) => item.id !== id)?.name ?? ''
    accounts.value = accounts.value.filter((item) => item.id !== id)
    if (deletedAccount) {
      recurringExpenses.value = recurringExpenses.value.map((item) => item.account === deletedAccount.name ? { ...item, account: fallbackAccount } : item)
    }
  }

  const markRecurringAsPaid = (id: string) => {
    recurringExpenses.value = recurringExpenses.value.map((item) =>
      item.id === id ? { ...item, status: item.status === 'paid' ? 'unpaid' : 'paid' } : item)
  }

  const toggleRecurringStatus = (id: string) => {
    recurringExpenses.value = recurringExpenses.value.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item)
  }

  const resetDemoData = () => {
    transactions.value = [...mockData.transactions]
    recurringExpenses.value = [...mockData.recurringExpenses]
    monthlyBudget.value = [...mockData.monthlyBudget]
    accounts.value = [...mockData.accounts]
    savingsGoals.value = [...mockData.savingsGoals]
  }

  return {
    transactions,
    recurringExpenses,
    accounts,
    monthlyBudget,
    savingsGoals,
    loading,
    error,
    currentMonthLabel,
    totalIncome,
    totalExpense,
    totalBudget,
    totalBudgetUsed,
    remainingBudget,
    totalAccountBalance,
    balance,
    savingsRate,
    budgetSummary,
    pendingRecurring,
    recentTransactions,
    expenseByCategory,
    annualSummary,
    formatCurrency,
    addTransaction,
    deleteTransaction,
    addRecurringExpense,
    updateRecurringExpense,
    deleteRecurringExpense,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    addAccount,
    updateAccount,
    deleteAccount,
    markRecurringAsPaid,
    toggleRecurringStatus,
    resetDemoData,
  }
}
