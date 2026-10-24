<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">
    <div class="mx-auto max-w-[1500px] p-3 sm:p-5 lg:p-6">
      <div class="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div class="flex flex-col lg:flex-row">
          <aside class="w-full border-b border-slate-200 bg-slate-900 p-4 text-white lg:w-72 lg:border-b-0 lg:border-r">
            <div class="mb-6 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 text-xl shadow-lg shadow-blue-500/30">
                  💼
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-slate-300">Anggaran</p>
                  <h1 class="text-xl font-black">Bulanan</h1>
                </div>
              </div>
              <button
                type="button"
                class="rounded-xl border border-white/15 px-3 py-2 text-sm font-bold text-white lg:hidden"
                :aria-expanded="mobileMenuOpen"
                aria-controls="main-navigation"
                :aria-label="mobileMenuOpen ? 'Tutup menu' : 'Buka menu'"
                @click="mobileMenuOpen = !mobileMenuOpen"
              >
                {{ mobileMenuOpen ? 'Tutup ✕' : 'Menu ☰' }}
              </button>
            </div>

            <nav id="main-navigation" :class="mobileMenuOpen ? 'grid' : 'hidden lg:grid'" class="gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                v-for="item in menuItems"
                :key="item.value"
                type="button"
                @click="setActiveTab(item.value)"
                :aria-pressed="activeTab === item.value"
                :class="activeTab === item.value
                  ? 'bg-white/12 text-white shadow-lg shadow-slate-950/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'"
                class="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition duration-200"
              >
                <span>{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </button>
            </nav>
          </aside>

          <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <header class="mb-6 flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-600">Keuangan pribadi</p>
                <h2 class="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{{ pageTitle }}</h2>
              </div>

              <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-lg text-white">
                  💰
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-[0.12em] text-slate-500">Periode</p>
                  <p class="text-sm font-bold text-slate-900 sm:text-base">{{ selectedPeriodLabel }}</p>
                </div>
              </div>
            </header>

            <section v-if="['dashboard', 'transactions', 'budget', 'charts', 'reporting'].includes(activeTab)" class="mb-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div class="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Penyaring</p>
                  <p class="text-sm font-bold text-slate-800">Sesuaikan data yang ditampilkan</p>
                </div>
                <button type="button" class="text-xs font-bold text-blue-700" @click="resetFilters">Hapus filter</button>
              </div>
              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <label v-if="activeTab !== 'budget'" class="grid gap-1 text-xs font-semibold text-slate-600">Periode
                  <select v-model="periodMode" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
                    <option value="bulanan">Bulanan</option><option value="tahunan">Tahunan</option>
                  </select>
                </label>
                <label v-if="activeTab !== 'budget' && periodMode === 'bulanan'" class="grid gap-1 text-xs font-semibold text-slate-600">Bulan
                  <input v-model="selectedMonth" type="month" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
                </label>
                <label v-if="activeTab !== 'budget' && periodMode === 'tahunan'" class="grid gap-1 text-xs font-semibold text-slate-600">Tahun
                  <select v-model.number="selectedYear" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
                    <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                  </select>
                </label>
                <label v-if="activeTab !== 'budget'" class="grid gap-1 text-xs font-semibold text-slate-600">Akun
                  <select v-model="selectedAccount" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua akun</option><option v-for="account in accounts" :key="account.id" :value="account.name">{{ account.name }}</option></select>
                </label>
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Kategori
                  <select v-model="selectedCategory" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua kategori</option><option v-for="category in availableCategories" :key="category" :value="category">{{ category }}</option></select>
                </label>
                <label v-if="activeTab !== 'budget'" class="grid gap-1 text-xs font-semibold text-slate-600">Jenis transaksi
                  <select v-model="selectedType" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua jenis</option><option value="income">Pemasukan</option><option value="expense">Pengeluaran</option></select>
                </label>
              </div>
            </section>

            <div v-if="activeTab === 'dashboard'" class="space-y-6">
              <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title="Pemasukan" :value="formatCurrency(filteredIncome)" accent="emerald" icon="📈" />
                <SummaryCard title="Pengeluaran" :value="formatCurrency(filteredExpense)" accent="rose" icon="📉" />
                <SummaryCard title="Saldo" :value="formatCurrency(filteredIncome - filteredExpense)" accent="blue" icon="💳" />
                <SummaryCard title="Anggaran" :value="formatCurrency(visibleBudgetTotal)" accent="violet" icon="🧾" />
              </section>

              <section class="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
                <div class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div class="mb-5 flex items-center justify-between">
                    <div>
                      <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Ringkasan</p>
                      <h3 class="text-xl font-black text-slate-900">Ringkasan periode ini</h3>
                    </div>
                    <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Keuangan sehat</span>
                  </div>

                  <div class="grid gap-4 md:grid-cols-3">
                    <div class="rounded-2xl bg-slate-50 p-4">
                      <p class="text-xs uppercase tracking-[0.15em] text-slate-500">Arus kas</p>
                      <p class="mt-3 text-2xl font-black text-slate-900">{{ formatCurrency(filteredIncome - filteredExpense) }}</p>
                    </div>
                    <div class="rounded-2xl bg-emerald-50 p-4">
                      <p class="text-xs uppercase tracking-[0.15em] text-emerald-700">Rasio tabungan</p>
                      <p class="mt-3 text-2xl font-black text-emerald-600">{{ filteredSavingsRate.toFixed(1) }}%</p>
                    </div>
                    <div class="rounded-2xl bg-violet-50 p-4">
                      <p class="text-xs uppercase tracking-[0.15em] text-violet-700">Sisa anggaran</p>
                      <p class="mt-3 text-2xl font-black text-violet-600">{{ formatCurrency(visibleBudgetRemaining) }}</p>
                    </div>
                  </div>

                  <div class="mt-6 space-y-4">
                    <div v-for="item in visibleBudgetSummary.slice(0, 4)" :key="item.category" class="space-y-2">
                      <div class="flex items-center justify-between text-sm">
                        <span class="font-semibold text-slate-700">{{ item.category }}</span>
                        <span class="text-slate-500">{{ formatCurrency(item.used) }}</span>
                      </div>
                      <div class="h-2.5 rounded-full bg-slate-100">
                        <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" :style="{ width: `${Math.min(item.percent, 100)}%` }" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rounded-[24px] border border-slate-200 bg-slate-900 p-4 text-white shadow-sm sm:p-5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">Bulan ini</p>
                  <h3 class="mt-2 text-2xl font-black">Kinerja</h3>

                  <div class="mt-5 space-y-4">
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p class="text-sm text-slate-300">Pemasukan</p>
                      <p class="mt-2 text-2xl font-black text-emerald-400">{{ formatCurrency(filteredIncome) }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p class="text-sm text-slate-300">Pengeluaran</p>
                      <p class="mt-2 text-2xl font-black text-rose-300">{{ formatCurrency(filteredExpense) }}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div v-else-if="activeTab === 'transactions'" class="space-y-6">
              <section class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div class="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Data</p>
                    <h3 class="text-xl font-black text-slate-900">Riwayat transaksi</h3>
                  </div>
                  <button type="button" @click="resetDemoData" class="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                    Atur ulang data
                  </button>
                </div>

                <div class="overflow-x-auto">
                  <table class="min-w-full text-left text-sm">
                    <thead>
                      <tr class="border-b border-slate-200 text-slate-500">
                        <th class="px-3 py-3 font-semibold">Judul</th>
                        <th class="px-3 py-3 font-semibold">Kategori</th>
                        <th class="px-3 py-3 font-semibold">Tanggal</th>
                        <th class="px-3 py-3 font-semibold">Akun</th>
                        <th class="px-3 py-3 font-semibold">Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in filteredTransactions" :key="item.id" class="border-b border-slate-100">
                        <td class="px-3 py-3">
                          <div class="flex items-center gap-2">
                            <span class="font-bold text-slate-800">{{ item.title }}</span>
                            <span :class="item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'" class="text-[10px] font-bold uppercase tracking-[0.08em]">
                              {{ item.type === 'income' ? 'Masuk' : 'Keluar' }}
                            </span>
                          </div>
                        </td>
                        <td class="px-3 py-3 text-slate-600">{{ item.category }}</td>
                        <td class="px-3 py-3 text-slate-600">{{ formatDate(item.date) }}</td>
                        <td class="px-3 py-3 text-slate-600">{{ item.account }}</td>
                        <td :class="item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'" class="px-3 py-3 font-bold">
                          {{ item.type === 'income' ? '+' : '-' }}{{ formatCurrency(item.amount) }}
                        </td>
                      </tr>
                      <tr v-if="filteredTransactions.length === 0"><td colspan="5" class="px-3 py-8 text-center text-slate-500">Tidak ada transaksi untuk filter ini.</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div v-else-if="activeTab === 'budget'" class="space-y-6">
              <section class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div class="mb-4 flex items-center justify-between">
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Anggaran</p>
                    <h3 class="text-xl font-black text-slate-900">Anggaran bulanan</h3>
                  </div>
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{{ formatCurrency(visibleBudgetTotal) }}</span>
                </div>

                <div class="space-y-4">
                  <div v-for="item in visibleBudgetSummary" :key="item.category" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div class="mb-2 flex items-center justify-between gap-3">
                      <span class="font-bold text-slate-800">{{ item.category }}</span>
                      <span class="text-sm text-slate-500">{{ formatCurrency(item.used) }} / {{ formatCurrency(item.allocated) }}</span>
                    </div>
                    <div class="h-2.5 rounded-full bg-slate-200">
                      <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" :style="{ width: `${Math.min(item.percent, 100)}%` }" />
                    </div>
                    <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>Sisa {{ formatCurrency(item.remaining) }}</span>
                      <span>{{ item.percent.toFixed(0) }}%</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div v-else-if="activeTab === 'accounts'" class="space-y-4">
              <div class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Jenis akun
                  <select v-model="selectedAccountType" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua jenis</option><option v-for="type in accountTypes" :key="type" :value="type">{{ type }}</option></select>
                </label>
                <div class="flex items-center gap-3"><span class="text-xs text-slate-500">{{ filteredAccounts.length }} akun</span><button type="button" @click="openNewAccountForm" class="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">Tambah akun</button></div>
              </div>
              <form v-if="accountFormOpen" class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4" @submit.prevent="saveAccount">
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Nama akun<input v-model.trim="accountForm.name" required class="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Contoh: Bank Mandiri"></label>
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Jenis akun<select v-model="accountForm.type" class="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option>Bank</option><option>Tunai</option><option>Dompet digital</option><option>Lainnya</option></select></label>
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Saldo awal<input v-model.number="accountForm.balance" required min="0" type="number" class="rounded-xl border border-slate-200 px-3 py-2 text-sm"></label>
                <div class="flex items-end gap-2"><button type="submit" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">{{ editingAccountId ? 'Simpan perubahan' : 'Simpan akun' }}</button><button type="button" @click="closeAccountForm" class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">Batal</button></div>
              </form>
              <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div v-for="account in filteredAccounts" :key="account.id" class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{{ account.type }}</p>
                    <h3 class="text-xl font-black text-slate-900">{{ account.name }}</h3>
                  </div>
                  <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-lg">🏦</div>
                </div>
                <p class="text-3xl font-black text-slate-900">{{ formatCurrency(account.balance) }}</p>
                <div class="mt-4 flex gap-2"><button type="button" @click="editAccount(account)" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">Ubah</button><button type="button" @click="removeAccount(account.id)" class="rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600">Hapus</button></div>
              </div>
              <div v-if="filteredAccounts.length === 0" class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Tidak ada akun untuk filter ini.</div>
              </div>
            </div>

            <div v-else-if="activeTab === 'charts'" class="space-y-6">
              <section class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Grafik · {{ selectedPeriodLabel }}</p>
                <h3 class="mt-2 text-xl font-black text-slate-900">Pemasukan dan pengeluaran</h3>
                <p class="mt-1 text-sm text-slate-500">Perbandingan total sesuai filter yang dipilih</p>
                <div class="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                  <div class="relative h-52 w-52 shrink-0 rounded-full" :style="{ background: annualDonutStyle }" role="img" aria-label="Diagram lingkaran pemasukan dan pengeluaran">
                    <div class="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white text-center"><span class="text-xs text-slate-500">Total periode</span><strong class="mt-1 text-lg text-slate-900">{{ formatCurrency(annualIncomeTotal + annualExpenseTotal) }}</strong></div>
                  </div>
                  <div class="grid w-full gap-3 sm:max-w-sm">
                    <div class="flex items-center justify-between rounded-2xl bg-emerald-50 p-4"><span class="font-semibold text-emerald-800"><i class="mr-2 inline-block h-3 w-3 rounded-full bg-emerald-500" />Pemasukan</span><strong class="text-emerald-800">{{ formatCurrency(annualIncomeTotal) }}</strong></div>
                    <div class="flex items-center justify-between rounded-2xl bg-rose-50 p-4"><span class="font-semibold text-rose-800"><i class="mr-2 inline-block h-3 w-3 rounded-full bg-rose-500" />Pengeluaran</span><strong class="text-rose-800">{{ formatCurrency(annualExpenseTotal) }}</strong></div>
                  </div>
                </div>
              </section>

              <section class="grid gap-6 xl:grid-cols-2">
                <div class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Pengeluaran per kategori</p>
                  <h3 class="mt-2 text-xl font-black text-slate-900">Pembagian kategori {{ selectedPeriodLabel }}</h3>
                  <div class="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                    <div class="relative h-44 w-44 shrink-0 rounded-full" :style="{ background: categoryDonutStyle }" role="img" aria-label="Diagram lingkaran pengeluaran per kategori">
                      <div class="absolute inset-7 flex flex-col items-center justify-center rounded-full bg-white text-center"><span class="text-xs text-slate-500">Total keluar</span><strong class="mt-1 text-base text-slate-900">{{ formatCurrency(categoryExpenseTotal) }}</strong></div>
                    </div>
                    <div class="grid w-full gap-2">
                      <div v-for="item in expenseChartData" :key="item.category" class="flex items-center justify-between gap-2 text-xs"><span class="font-semibold text-slate-700"><i class="mr-2 inline-block h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: item.color }" />{{ item.category }}</span><span class="text-slate-500">{{ formatCurrency(item.value) }}</span></div>
                    </div>
                  </div>
                </div>

                <div class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Anggaran dan realisasi</p>
                  <h3 class="mt-2 text-xl font-black text-slate-900">Pemakaian anggaran</h3>
                  <div class="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                    <div class="relative h-44 w-44 shrink-0 rounded-full" :style="{ background: budgetDonutStyle }" role="img" aria-label="Diagram lingkaran realisasi dan sisa anggaran">
                      <div class="absolute inset-7 flex flex-col items-center justify-center rounded-full bg-white text-center"><span class="text-xs text-slate-500">Terpakai</span><strong class="mt-1 text-base text-slate-900">{{ formatCurrency(visibleBudgetUsed) }}</strong></div>
                    </div>
                    <div class="grid w-full gap-2 text-xs">
                      <div class="flex items-center justify-between"><span class="font-semibold text-slate-700"><i class="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />Realisasi</span><span>{{ formatCurrency(visibleBudgetUsed) }}</span></div>
                      <div class="flex items-center justify-between"><span class="font-semibold text-slate-700"><i class="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-slate-200" />Sisa anggaran</span><span>{{ formatCurrency(visibleBudgetRemaining) }}</span></div>
                      <p class="mt-2 text-slate-500">{{ budgetUsageRate.toFixed(0) }}% dari total anggaran telah digunakan.</p>
                    </div>
                  </div>
                </div>

                <div class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5 xl:col-span-2">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Tren pengeluaran</p>
                  <h3 class="mt-2 text-xl font-black text-slate-900">Sebaran pengeluaran {{ selectedPeriodLabel }}</h3>
                  <div class="mt-6 flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                    <div class="relative h-52 w-52 shrink-0 rounded-full" :style="{ background: trendDonutStyle }" role="img" aria-label="Diagram lingkaran tren pengeluaran tahunan">
                      <div class="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white text-center"><span class="text-xs text-slate-500">Total setahun</span><strong class="mt-1 text-base text-slate-900">{{ formatCurrency(annualExpenseTotal) }}</strong></div>
                    </div>
                    <div class="grid w-full grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">
                      <div v-for="(item, index) in chartMonthlySummary" :key="item.month" class="flex items-center justify-between gap-2 text-xs"><span class="font-semibold text-slate-700"><i class="mr-1.5 inline-block h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: trendColors[index % trendColors.length] }" />{{ item.month }}</span><span class="text-slate-500">{{ formatCurrency(item.expense) }}</span></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div v-else-if="activeTab === 'reporting'" class="space-y-6">
              <section class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Laporan</p>
                <h3 class="mt-2 text-xl font-black text-slate-900">Laporan {{ periodMode === 'tahunan' ? 'tahunan' : 'bulanan' }}</h3>

                <div class="mt-5 overflow-x-auto">
                  <table class="min-w-full text-left text-sm">
                    <thead>
                      <tr class="border-b border-slate-200 text-slate-500">
                        <th class="px-3 py-3 font-semibold">Bulan</th>
                        <th class="px-3 py-3 font-semibold">Pemasukan</th>
                        <th class="px-3 py-3 font-semibold">Pengeluaran</th>
                        <th class="px-3 py-3 font-semibold">Selisih</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in reportingRows" :key="item.month" class="border-b border-slate-100">
                        <td class="px-3 py-3 font-semibold text-slate-700">{{ item.month }}</td>
                        <td class="px-3 py-3 text-emerald-600">{{ formatCurrency(item.income) }}</td>
                        <td class="px-3 py-3 text-rose-600">{{ formatCurrency(item.expense) }}</td>
                        <td class="px-3 py-3 font-bold text-slate-800">{{ formatCurrency(item.difference) }}</td>
                      </tr>
                      <tr v-if="reportingRows.length === 0"><td colspan="4" class="px-3 py-8 text-center text-slate-500">Tidak ada data pada periode ini.</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div v-else-if="activeTab === 'savings'" class="space-y-4">
              <div class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Status sasaran
                  <select v-model="savingsStatusFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua status</option><option value="berjalan">Sedang berjalan</option><option value="tercapai">Tercapai</option></select>
                </label>
                <div class="flex items-center gap-3"><span class="text-xs text-slate-500">{{ filteredSavingsGoals.length }} sasaran</span><button type="button" @click="openNewSavingsForm" class="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">Tambah sasaran</button></div>
              </div>
              <form v-if="savingsFormOpen" class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-5" @submit.prevent="saveSavingsGoal">
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Nama sasaran<input v-model.trim="savingsForm.name" required class="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Contoh: Dana pendidikan"></label>
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Target nominal<input v-model.number="savingsForm.target" required min="1" type="number" class="rounded-xl border border-slate-200 px-3 py-2 text-sm"></label>
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Tabungan saat ini<input v-model.number="savingsForm.saved" required min="0" type="number" class="rounded-xl border border-slate-200 px-3 py-2 text-sm"></label>
                <label class="grid gap-1 text-xs font-semibold text-slate-600">Tanggal tenggat<input v-model="savingsForm.dueDate" required type="date" class="rounded-xl border border-slate-200 px-3 py-2 text-sm"></label>
                <div class="flex items-end gap-2"><button type="submit" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">{{ editingSavingsId ? 'Simpan perubahan' : 'Simpan sasaran' }}</button><button type="button" @click="closeSavingsForm" class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">Batal</button></div>
              </form>
              <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div v-for="goal in filteredSavingsGoals" :key="goal.id" class="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex items-center justify-between">
                  <p class="text-sm font-bold text-slate-800">{{ goal.name }}</p>
                  <span class="rounded-full px-2 py-1 text-[10px] font-bold text-white" :class="goal.color">Sasaran</span>
                </div>
                <p class="text-2xl font-black text-slate-900">{{ formatCurrency(goal.saved) }}</p>
                <p class="mt-1 text-xs text-slate-500">dari {{ formatCurrency(goal.target) }}</p>
                <div class="mt-4 h-2.5 rounded-full bg-slate-100">
                  <div class="h-full rounded-full" :class="goal.color" :style="{ width: `${Math.min((goal.saved / goal.target) * 100, 100)}%` }" />
                </div>
                <p class="mt-3 text-xs text-slate-500">Tenggat: {{ formatDate(goal.dueDate) }}</p>
                <div class="mt-4 flex gap-2"><button type="button" @click="editSavingsGoal(goal)" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">Ubah</button><button type="button" @click="removeSavingsGoal(goal.id)" class="rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600">Hapus</button></div>
              </div>
              <div v-if="filteredSavingsGoals.length === 0" class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Tidak ada sasaran untuk filter ini.</div>
              </div>
            </div>

            <div v-else-if="activeTab === 'settings'" class="space-y-6">
              <section class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Pengaturan</p>
                <div class="flex items-center justify-between gap-3"><h3 class="mt-2 text-xl font-black text-slate-900">Pengeluaran rutin</h3><button type="button" @click="openNewRecurringForm" class="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">Tambah rutin</button></div>

                <form v-if="recurringFormOpen" class="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4" @submit.prevent="saveRecurringExpense">
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Nama pengeluaran<input v-model.trim="recurringForm.name" required class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Contoh: Internet"></label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Nominal<input v-model.number="recurringForm.amount" required min="1" type="number" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"></label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Kategori<input v-model.trim="recurringForm.category" required class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Contoh: Utilitas"></label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Akun pembayaran<select v-model="recurringForm.account" required class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><option disabled value="">Pilih akun</option><option v-for="account in accounts" :key="account.id" :value="account.name">{{ account.name }}</option></select></label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Tanggal jatuh tempo<input v-model.number="recurringForm.dueDay" required min="1" max="31" type="number" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"></label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Tanggal mulai<input v-model="recurringForm.startDate" required type="date" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"></label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Tanggal berakhir (opsional)<input v-model="recurringForm.endDate" type="date" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"></label>
                  <label class="flex items-center gap-2 self-end rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"><input v-model="recurringForm.active" type="checkbox"> Aktif</label>
                  <div class="flex items-end gap-2"><button type="submit" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">{{ editingRecurringId ? 'Simpan perubahan' : 'Simpan rutin' }}</button><button type="button" @click="closeRecurringForm" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">Batal</button></div>
                </form>

                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Kategori
                    <select v-model="recurringCategoryFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua kategori</option><option v-for="category in recurringCategories" :key="category" :value="category">{{ category }}</option></select>
                  </label>
                  <label class="grid gap-1 text-xs font-semibold text-slate-600">Status pembayaran
                    <select v-model="recurringStatusFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"><option value="semua">Semua status</option><option value="unpaid">Belum dibayar</option><option value="paid">Sudah dibayar</option></select>
                  </label>
                </div>

                <div class="mt-5 space-y-3">
                  <div v-for="item in filteredRecurringExpenses" :key="item.id" class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p class="font-bold text-slate-800">{{ item.name }}</p>
                      <p class="text-xs text-slate-500">{{ item.category }} • {{ item.dueDay }} • {{ item.account }}</p>
                    </div>

                    <div class="flex items-center gap-2">
                      <button type="button" @click="toggleRecurringStatus(item.id)" :class="item.active ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'" class="rounded-xl px-2.5 py-1.5 text-xs font-bold">
                        {{ item.active ? 'Aktif' : 'Nonaktif' }}
                      </button>
                      <button type="button" @click="markRecurringAsPaid(item.id)" class="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700">
                        {{ item.status === 'paid' ? 'Bayar lagi' : 'Sudah dibayar' }}
                      </button>
                      <button type="button" @click="editRecurringExpense(item)" class="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700">Ubah</button>
                      <button type="button" @click="removeRecurringExpense(item.id)" class="rounded-xl border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-bold text-rose-600">Hapus</button>
                    </div>
                  </div>
                  <p v-if="filteredRecurringExpenses.length === 0" class="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">Tidak ada pengeluaran rutin untuk filter ini.</p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const {
  addAccount,
  addRecurringExpense,
  addSavingsGoal,
  accounts,
  annualSummary,
  budgetSummary,
  deleteAccount: removeAccount,
  deleteRecurringExpense: removeRecurringExpense,
  deleteSavingsGoal: removeSavingsGoal,
  formatCurrency,
  markRecurringAsPaid,
  resetDemoData,
  recurringExpenses,
  savingsGoals,
  toggleRecurringStatus,
  transactions,
  updateAccount,
  updateRecurringExpense,
  updateSavingsGoal,
} = useBudgetStore()

const menuItems = [
  { label: 'Dasbor', value: 'dashboard', icon: '📊' },
  { label: 'Transaksi', value: 'transactions', icon: '🧾' },
  { label: 'Anggaran Bulanan', value: 'budget', icon: '💸' },
  { label: 'Akun', value: 'accounts', icon: '🏦' },
  { label: 'Grafik', value: 'charts', icon: '📈' },
  { label: 'Laporan', value: 'reporting', icon: '📄' },
  { label: 'Target Tabungan', value: 'savings', icon: '🎯' },
  { label: 'Pengaturan', value: 'settings', icon: '⚙️' },
]

const activeTab = ref('dashboard')
const mobileMenuOpen = ref(false)
const pageTitle = computed(() => menuItems.find((item) => item.value === activeTab.value)?.label ?? 'Dasbor')
const currentYear = new Date().getFullYear()
const now = new Date()
const periodMode = ref<'bulanan' | 'tahunan'>('bulanan')
const selectedMonth = ref(`${currentYear}-${String(now.getMonth() + 1).padStart(2, '0')}`)
const selectedYear = ref(currentYear)
const selectedAccount = ref('semua')
const selectedCategory = ref('semua')
const selectedType = ref('semua')
const selectedAccountType = ref('semua')
const savingsStatusFilter = ref('semua')
const recurringStatusFilter = ref('semua')
const recurringCategoryFilter = ref('semua')
const recurringFormOpen = ref(false)
const editingRecurringId = ref<string | null>(null)
const recurringForm = ref({ name: '', amount: 0, category: '', account: '', dueDay: 1, active: true, startDate: new Date().toISOString().slice(0, 10), endDate: '' })
const savingsFormOpen = ref(false)
const editingSavingsId = ref<string | null>(null)
const savingsForm = ref({ name: '', target: 1, saved: 0, dueDate: '' })
const accountFormOpen = ref(false)
const editingAccountId = ref<string | null>(null)
const accountForm = ref({ name: '', type: 'Bank', balance: 0 })
const trendColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#6366f1', '#a855f7', '#f43f5e', '#84cc16']
const availableYears = computed(() => [...new Set([currentYear, ...transactions.value.map((item) => Number(item.date.slice(0, 4)))])].sort((a, b) => b - a))
const availableCategories = computed(() => [...new Set([...transactions.value.map((item) => item.category), ...budgetSummary.value.map((item) => item.category)])].sort((a, b) => a.localeCompare(b, 'id')))
const selectedPeriodLabel = computed(() => periodMode.value === 'bulanan'
  ? new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(`${selectedMonth.value}-01T00:00:00`))
  : String(selectedYear.value))
const filteredTransactions = computed(() => transactions.value.filter((item) => {
  const inPeriod = periodMode.value === 'bulanan'
    ? item.date.startsWith(selectedMonth.value)
    : item.date.startsWith(String(selectedYear.value))
  return inPeriod
    && (selectedAccount.value === 'semua' || item.account === selectedAccount.value)
    && (selectedCategory.value === 'semua' || item.category === selectedCategory.value)
    && (selectedType.value === 'semua' || item.type === selectedType.value)
}))
const filteredIncome = computed(() => filteredTransactions.value.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0))
const filteredExpense = computed(() => filteredTransactions.value.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0))
const filteredSavingsRate = computed(() => filteredIncome.value ? (filteredIncome.value - filteredExpense.value) / filteredIncome.value * 100 : 0)
const visibleBudgetSummary = computed(() => budgetSummary.value.filter((item) => selectedCategory.value === 'semua' || item.category === selectedCategory.value))
const accountTypes = computed(() => [...new Set(accounts.value.map((item) => item.type))].sort())
const filteredAccounts = computed(() => accounts.value.filter((item) => selectedAccountType.value === 'semua' || item.type === selectedAccountType.value))
const filteredSavingsGoals = computed(() => savingsGoals.value.filter((item) => savingsStatusFilter.value === 'semua' || (savingsStatusFilter.value === 'tercapai' ? item.saved >= item.target : item.saved < item.target)))
const recurringCategories = computed(() => [...new Set(recurringExpenses.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'id')))
const filteredRecurringExpenses = computed(() => recurringExpenses.value.filter((item) => (recurringCategoryFilter.value === 'semua' || item.category === recurringCategoryFilter.value) && (recurringStatusFilter.value === 'semua' || item.status === recurringStatusFilter.value)))
const reportingRows = computed(() => {
  const hasTransactionFilters = selectedAccount.value !== 'semua' || selectedCategory.value !== 'semua' || selectedType.value !== 'semua'
  if (periodMode.value === 'tahunan' && selectedYear.value === currentYear && !hasTransactionFilters) return annualSummary.value
  const months = new Map<string, { month: string, income: number, expense: number, difference: number }>()
  for (const item of filteredTransactions.value) {
    const monthNumber = Number(item.date.slice(5, 7)) - 1
    const month = new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(Number(item.date.slice(0, 4)), monthNumber, 1))
    const monthKey = item.date.slice(0, 7)
    const row = months.get(monthKey) ?? { month, income: 0, expense: 0, difference: 0 }
    if (item.type === 'income') row.income += item.amount
    else row.expense += item.amount
    row.difference = row.income - row.expense
    months.set(monthKey, row)
  }
  return [...months.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, row]) => row)
})
const chartMonthlySummary = computed(() => reportingRows.value)
const annualIncomeTotal = computed(() => chartMonthlySummary.value.reduce((sum, item) => sum + item.income, 0))
const annualExpenseTotal = computed(() => chartMonthlySummary.value.reduce((sum, item) => sum + item.expense, 0))
const categoryExpenseTotal = computed(() => expenseChartData.value.reduce((sum, item) => sum + item.value, 0))
const expenseChartData = computed(() => {
  const totals = new Map<string, number>()
  filteredTransactions.value.filter((item) => item.type === 'expense').forEach((item) => totals.set(item.category, (totals.get(item.category) ?? 0) + item.amount))
  return [...totals.entries()].sort((a, b) => b[1] - a[1]).map(([category, value], index) => ({ category, value, color: trendColors[index % trendColors.length] }))
})
const visibleBudgetTotal = computed(() => visibleBudgetSummary.value.reduce((sum, item) => sum + item.allocated, 0))
const visibleBudgetUsed = computed(() => visibleBudgetSummary.value.reduce((sum, item) => sum + item.used, 0))
const visibleBudgetRemaining = computed(() => visibleBudgetTotal.value - visibleBudgetUsed.value)
const budgetUsageRate = computed(() => visibleBudgetTotal.value > 0 ? visibleBudgetUsed.value / visibleBudgetTotal.value * 100 : 0)
const donutStyle = (values: number[], colors: string[]) => {
  const sum = values.reduce((total, value) => total + value, 0)
  if (sum === 0) return 'conic-gradient(#e2e8f0 0% 100%)'
  const total = sum
  let offset = 0
  const segments = values.map((value, index) => {
    const start = offset
    offset += value / total * 100
    return `${colors[index]} ${start}% ${offset}%`
  })
  return `conic-gradient(${segments.join(', ')})`
}
const annualDonutStyle = computed(() => donutStyle([annualIncomeTotal.value, annualExpenseTotal.value], ['#10b981', '#f43f5e']))
const categoryDonutStyle = computed(() => donutStyle(expenseChartData.value.map((item) => item.value), expenseChartData.value.map((item) => item.color)))
const budgetDonutStyle = computed(() => donutStyle([visibleBudgetUsed.value, Math.max(visibleBudgetRemaining.value, 0)], ['#3b82f6', '#e2e8f0']))
const trendDonutStyle = computed(() => donutStyle(chartMonthlySummary.value.map((item) => item.expense), trendColors))
const resetFilters = () => {
  periodMode.value = 'bulanan'
  selectedMonth.value = `${currentYear}-${String(now.getMonth() + 1).padStart(2, '0')}`
  selectedYear.value = currentYear
  selectedAccount.value = 'semua'
  selectedCategory.value = 'semua'
  selectedType.value = 'semua'
  selectedAccountType.value = 'semua'
  savingsStatusFilter.value = 'semua'
  recurringStatusFilter.value = 'semua'
  recurringCategoryFilter.value = 'semua'
}

const openNewRecurringForm = () => {
  editingRecurringId.value = null
  recurringForm.value = { name: '', amount: 0, category: '', account: accounts.value[0]?.name ?? '', dueDay: 1, active: true, startDate: new Date().toISOString().slice(0, 10), endDate: '' }
  recurringFormOpen.value = true
}
const editRecurringExpense = (item: typeof recurringExpenses.value[number]) => {
  editingRecurringId.value = item.id
  recurringForm.value = { name: item.name, amount: item.amount, category: item.category, account: item.account, dueDay: item.dueDay, active: item.active, startDate: item.startDate, endDate: item.endDate ?? '' }
  recurringFormOpen.value = true
}
const closeRecurringForm = () => { recurringFormOpen.value = false; editingRecurringId.value = null }
const saveRecurringExpense = () => {
  const existing = recurringExpenses.value.find((item) => item.id === editingRecurringId.value)
  const payload = { ...recurringForm.value, status: existing?.status ?? 'unpaid' as const, endDate: recurringForm.value.endDate || undefined }
  if (editingRecurringId.value) updateRecurringExpense(editingRecurringId.value, payload)
  else addRecurringExpense(payload)
  closeRecurringForm()
}

const openNewSavingsForm = () => {
  editingSavingsId.value = null
  savingsForm.value = { name: '', target: 1, saved: 0, dueDate: '' }
  savingsFormOpen.value = true
}
const editSavingsGoal = (goal: typeof savingsGoals.value[number]) => {
  editingSavingsId.value = goal.id
  savingsForm.value = { name: goal.name, target: goal.target, saved: goal.saved, dueDate: goal.dueDate }
  savingsFormOpen.value = true
}
const closeSavingsForm = () => { savingsFormOpen.value = false; editingSavingsId.value = null }
const saveSavingsGoal = () => {
  if (editingSavingsId.value) updateSavingsGoal(editingSavingsId.value, savingsForm.value)
  else addSavingsGoal(savingsForm.value)
  closeSavingsForm()
}

const openNewAccountForm = () => {
  editingAccountId.value = null
  accountForm.value = { name: '', type: 'Bank', balance: 0 }
  accountFormOpen.value = true
}
const editAccount = (account: typeof accounts.value[number]) => {
  editingAccountId.value = account.id
  accountForm.value = { name: account.name, type: account.type, balance: account.balance }
  accountFormOpen.value = true
}
const closeAccountForm = () => { accountFormOpen.value = false; editingAccountId.value = null }
const saveAccount = () => {
  if (editingAccountId.value) updateAccount(editingAccountId.value, accountForm.value)
  else addAccount(accountForm.value)
  closeAccountForm()
}

const setActiveTab = (value: string) => {
  activeTab.value = value
  mobileMenuOpen.value = false
}

const formatDate = (value: string) => new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(`${value}T00:00:00`))

const SummaryCard = {
  props: ['title', 'value', 'accent', 'icon'],
  template: `
    <article
      :class="[
        accent === 'emerald' ? 'border-emerald-100 bg-gradient-to-br from-emerald-50 to-white' : '',
        accent === 'rose' ? 'border-rose-100 bg-gradient-to-br from-rose-50 to-white' : '',
        accent === 'blue' ? 'border-blue-100 bg-gradient-to-br from-blue-50 to-white' : '',
        accent === 'violet' ? 'border-violet-100 bg-gradient-to-br from-violet-50 to-white' : '',
        'rounded-[24px] border p-4 shadow-sm sm:p-5'
      ]"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm font-semibold text-slate-700">{{ title }}</span>
        <span class="rounded-full bg-white/80 p-2 text-lg">{{ icon }}</span>
      </div>
      <p
        :class="[
          accent === 'emerald' ? 'text-emerald-600' : '',
          accent === 'rose' ? 'text-rose-600' : '',
          accent === 'blue' ? 'text-blue-600' : '',
          accent === 'violet' ? 'text-violet-600' : '',
          'text-2xl font-black sm:text-3xl'
        ]"
      >
        {{ value }}
      </p>
    </article>
  `,
}
</script>
