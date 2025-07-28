<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar -->
    <div class="navbar justify-between px-4 h-18">
      <div class="flex items-center">
        <div class="flex gap-2 items-center text-xl p-2">
          <NuxtImg key="logo" src="/logo.svg" class="w-8" />

          <span class="font-mono text-2xl font-extrabold">
            Amaze Template
          </span>
        </div>
      </div>

      <div class="flex gap-2 items-center">
        <label
          for="drawer"
          class="btn btn-ghost btn-sm"
          @click="drawer = !drawer"
        >
          <Icon name="hugeicons:menu-01" class="w-6 h-6" />
        </label>

        <div class="relative">
          <label class="btn btn-ghost btn-sm relative" @click="notif = !notif">
            <span
              class="absolute z-10 top-0.5 right-2 rounded-full bg-red-500 block w-2 h-2"
            />

            <Icon name="hugeicons:notification-02" class="w-6 h-6" />
          </label>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="-translate-y-4 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-4 opacity-0"
          >
            <ul
              v-if="notif"
              class="absolute z-50 -left-40 top-10 dropdown menu w-52 rounded-box bg-base-100 shadow-xl"
            >
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </Transition>
        </div>
        <div class="relative dropdown-end">
          <!-- Avatar button -->
          <button
            class="btn btn-ghost btn-circle avatar"
            @click="avatarDropdownOpen = !avatarDropdownOpen"
          >
            <div class="w-10 rounded-full">
              <NuxtImg
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </button>

          <!-- Dropdown menu with transition -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="-translate-y-4 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-4 opacity-0"
          >
            <ul
              v-show="avatarDropdownOpen"
              class="absolute right-0 top-14 z-50 w-52 menu menu-sm dropdown-content bg-base-100 rounded-box p-2 shadow-xl"
            >
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li>
                <a class="justify-between">
                  <span>Mode</span>
                  <label class="swap swap-rotate text-sm">
                    <input
                      type="checkbox"
                      class="theme-controller"
                      value="dark"
                    />
                    <Icon
                      name="solar:sun-outline"
                      class="text-xl swap-off text-yellow-500"
                    />
                    <Icon
                      name="solar:moon-outline"
                      class="text-xl swap-on text-indigo-500"
                    />
                  </label>
                </a>
              </li>
              <li>
                <button
                  class="mt-4 btn btn-xs btn-error text-white"
                  @click="logout()"
                >
                  <Icon name="solar:logout-linear" class="w-5 h-5" />
                  Logout
                </button>
              </li>
            </ul>
          </Transition>
        </div>
      </div>
    </div>
    <!-- Main area: Drawer + Content -->
    <div class="flex-1 flex overflow-hidden">
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-show="drawer"
          class="transition-all absolute z-20 bg-base-100"
          style="height: calc(100% - 4.5rem); overflow: hidden"
        >
          <Drawer />
        </div>
      </Transition>

      <!-- Main content -->
      <main
        :class="[
          'transition-all duration-300 ease-in-out flex-1 p-4',
          drawer ? 'ml-58' : 'ml-0',
        ]"
      >
        <div class="overflow-y-auto h-full rounded-2xl bg-base-200">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
const drawer = ref(true);
const notif = ref(false);
const avatarDropdownOpen = ref(false);
function logout() {}
</script>
