<template>
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6 flex">
    <div class="flex">
        <img class="h-200" :src="require(`~/assets/${game.image_name}`)" alt="1943">
    </div>
    <div class="flex">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ game.name }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500" >
        {{ game.overview }}
        </p>
    </div>
  </div>
  <div class="border-t border-gray-200">
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Full Name
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {{ game.name }}
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Company
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          Capcom
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Release
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {{ game.release }}
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Sales
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          300.000 Units
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Comments
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ game.comment }}
        </dd>
      </div>
    </dl>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    console.log('params.id :' + JSON.stringify(params))
    // TODO: Por qué chucha en los parámetros está el nombre del template dinámico
    const { data } = await axios.get(`/api/games/${params.id}`)
    return {
      game: data
    }
  }
}
</script>
