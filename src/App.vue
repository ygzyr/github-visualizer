<template>
  <div
    class="
      grid
      sm:grid
      items-center
      justify-center
      min-h-screen min-w-screen
      bg-gray-500
    "
  >
    <input
      type="text"
      class="mt-8 mx-2 md:mx-0 h-8 rounded-full p-4 bg-gray-300 text-gray-800 outline-none"
      placeholder="Search..."
      focus="bg-gray-100"
      v-model="query"
      @keypress="getUser"
    />
    <div
      class="
        bg-gray-700
        md:p-6
        p-2
        mx-2
        grid
        rounded-lg
        items-start
        justify-items-center
      "
    >
      <div v-if="seen" class="grid md:flex items-center">
        <a
          class="rounded-full w-56 h-56"
          :href="userinfo.avatar_url"
          title="If you want this image click the photo"
          target="_blank"
        >
          <img :src="userinfo.avatar_url" class="rounded-full w-56 h-56" />
        </a>
        <div class="ml-4">
          <a :href="userinfo.html_url" target="_blank">
            <h1
              class="
                flex
                text-gray-200 text-4xl
                font-semibold
                mt-5
                items-center
              "
            >
              {{ userinfo.login }}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="ml-2 text-gray-200"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"
                  />
                </g>
              </svg>
            </h1>
          </a>
          <p class="text-gray-300 mt-2">{{ userinfo.bio }}</p>
          <div class="flex space-x-3">
            <h3 class="text-gray-300 text-sm">
              {{ "Followers: " + userinfo.followers }}
            </h3>
            <h3 class="text-gray-300 text-sm">
              {{ "Following: " + userinfo.following }}
            </h3>
          </div>
          <div class="space-x-3 sm:flex mt-4">
            <a
              class="links"
              :href="getTwitter()"
              target="_blank"
              v-if="userinfo.twitter_username != null"
            >
              {{ "@" + userinfo.twitter_username }}
            </a>
            <a :href="getRepo()" target="_blank" class="links">
              {{ "Repos: " + userinfo.public_repos }}
            </a>
            <a
              :href="getWebsite()"
              target="_blank"
              class="links"
              v-if="userinfo.blog != null"
            >
              Website
            </a>
            <a :href="getFollowers()" target="_blank" class="links">
              Followers
            </a>
          </div>
          <div class="flex mt-2">
            <h2 class="text-gray-200">
              {{ "Location: " + getLocation() }}
            </h2>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center items-center">
        <h1 class="text-gray-200">
          Welcome to Github Visualizer. Write username to textbox and press
          Enter!
        </h1>
      </div>
    </div>
    <Footer class="mx-2 md:mx-0"/>
  </div>
</template>

<script>
import Footer from "/src/components/Footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      userinfo: [],
      query: "",
      seen: false,
    };
  },
  methods: {
    getFollowers: function () {
      return "https://github.com/" + this.userinfo.login + "?tab=followers";
    },
    getTwitter: function () {
      return "https://twitter.com/" + this.userinfo.twitter_username;
    },
    getRepo: function () {
      return "https://github.com/" + this.userinfo.login + "?tab=repositories";
    },
    getWebsite: function () {
      let url = this.userinfo.blog;
      if (url.startsWith("www")) {
        return "http://" + this.userinfo.blog;
      } else if (url.startsWith("https://")) {
        return this.userinfo.blog;
      } else {
        return "https://" + this.userinfo.blog;
      }
    },
    getLocation: function () {
      if (this.userinfo.location != null) {
        return this.userinfo.location;
      } else {
        return "Anywhere In The Universe";
      }
    },
    getUser(e) {
      if (e.key == "Enter") {
        this.axios
          .get("https://api.github.com/users/" + this.query)
          .then((response) => {
            if (response.data.login != "Not Found") {
              this.seen = true;
              this.userinfo = response.data;
            } else {
              this.seen = false;
            }
          });
      }
    },
  },
};
</script>

<style>
p {
  width: 300px;
}
.sm {
  @apply w-96;
}
.links {
  @apply text-lg font-semibold bg-gray-200 rounded-md p-2 items-center;
}
</style>
