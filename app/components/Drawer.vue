<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-full flex flex-col">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay" />
    <ul class="menu w-58 p-4 h-full">
      <li>
        <NuxtLink to="/">
          <Icon name="hugeicons:home-09" class="w-5 h-5 opacity-80" />
          Home
        </NuxtLink>
      </li>
      <li>
        <details>
          <summary>
            <Icon name="hugeicons:libraries" class="w-5 h-5 opacity-80" />
            Details
          </summary>
          <ul>
            <li>
              <NuxtLink to="/orders">
                <Icon
                  name="hugeicons:pacman-02"
                  class="w-4 h-4 opacity-80"
                />Page
              </NuxtLink>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</template>
