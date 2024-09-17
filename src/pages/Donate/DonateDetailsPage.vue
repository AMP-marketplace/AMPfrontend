<template>
  <div v-if="spin" class="spinner">
    <q-spinner color="primary" size="3em" />
  </div>
  <q-layout v-else class="bg_grey overflow-hidden">
    <div class="back q-mt-lg q-pa-md">
      <q-btn :to="{ name: 'donate' }" class="text2" flat no-caps>
        <i class="fa-solid q-mr-sm fa-arrow-left"></i>Back to all Donations
      </q-btn>
    </div>
    <div class="row container q-pt-lg items-center justify-end">
      <p class="text-h6 q-mr-sm">
        Status :
        <q-badge
          class="q-pa-md text-weight-bold"
          :color="postData.status === 'available' ? 'green' : 'red'"
        >
          {{ postData.status }}
        </q-badge>
      </p>
      <q-btn color="secondary" no-wrap no-caps @click="setPostStatus">
        Set status
      </q-btn>
    </div>

    <div class="bg-white main_area q-py-md q-py-lg">
      <div class="grid">
        <div class="right">
          <div class="row items-center">
            <img style="max-width: 100px" src="/images/ingo.svg" alt="" />
            <div>
              <div class="q-pb-xs">
                <h5 class="text-h4">
                  {{ postData.name }}
                </h5>
              </div>

              <div class="text2">
                {{ postData.description }}
              </div>
            </div>
          </div>

          <q-separator />
          <div class="q-mt-xl comments">Comments:</div>
          <div class="container">
            <div v-if="postData.comments.length">
              <div
                v-for="(comment, index) in postData.comments"
                :key="index"
                class="div"
              >
                <div class="img">
                  <!-- <img
                    v-if="comment.author.avatar"
                    style="width: 60px; height: 60px; border-radius: 100%"
                    :src="comment.author.avatar"
                    alt=""
                  /> -->
                  <img
                    style="width: 40px; height: 40px; border-radius: 100%"
                    src="/images/usersvg.svg"
                    alt=""
                  />
                  <img
                    style="width: 10px; height: 10px; border-radius: 100%"
                    class="verify"
                    src="/images/verify.svg"
                    alt=""
                  />
                </div>
                <div class="details">
                  <div class="text4">
                    {{
                      comment.author.name
                        ? `${comment.author.name}`
                        : `${comment.author.email}`
                    }}
                  </div>
                  <div class="text2 q-mb-sm">
                    {{
                      formatDistanceToNow(parseISO(comment.created_at), {
                        addSuffix: true,
                      })
                    }}
                  </div>

                  <div class="comments">
                    <!-- Hey there 👋
                    <br /> -->

                    {{ comment.remark }}
                  </div>

                  <div class="q-pa-md row justify-end no-wrap q-gutter-md">
                    <!-- <div class="row items-center">
                      <q-btn
                        @click="likePost('comment', comment._id)"
                        round
                        size="15px"
                        color="primary"
                        :icon="
                          comment.likes.includes(store.userdetails._id)
                            ? 'fa-solid fa-thumbs-up'
                            : 'fa-regular fa-thumbs-up'
                        "
                      />
                      <span class="q-ml-sm">
                        {{ comment.length }}
                      </span>
                    </div>
                    <div class="row items-center">
                      <q-btn
                        @click="dislikePost('comment', comment._id)"
                        round
                        size="8px"
                        color="primary"
                        :icon="
                          comment.dislikes.includes(store.userdetails._id)
                            ? 'fa-solid fa-thumbs-down'
                            : 'fa-regular fa-thumbs-down'
                        "
                      />
                      <span class="q-ml-sm">
                        {{ comment.dislikes.length }}
                      </span>
                    </div> -->
                    <q-btn
                      @click="editComment('comment', comment)"
                      round
                      v-if="store.userdetails.email === comment.author.email"
                      color="primary"
                      ><i
                        style="
                          width: 40px;
                          height: 40px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-size: 15px;
                        "
                        class="fa-regular text-weight-bold text-h6 fa-pen-to-square"
                      ></i
                    ></q-btn>
                    <q-btn
                      @click="deletePost('comment', comment.slug)"
                      round
                      v-if="store.userdetails.email === comment.author.email"
                      color="secondary"
                      ><i
                        style="
                          width: 40px;
                          height: 40px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-size: 15px;
                        "
                        class="fa-solid fa-trash"
                      ></i
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="q-my-lg note">
              <div class="row items-center justify-between">
                <div style="gap: 0.4rem" class="row items-center">
                  <img
                    style="width: 24px; height: 24px; border-radius: 100%"
                    src="/images/ingo.svg"
                    alt=""
                    class="q-mr-sm"
                  />

                  There's currently no comments on this post.
                </div>
              </div>
            </div>

            <div class="q-mt-lg">
              <div class="comment_input">
                <form @submit.prevent="createComments">
                  <textarea
                    v-model="comment"
                    placeholder="Your comment"
                    cols="30"
                    rows="10"
                  ></textarea>

                  <q-btn
                    :loading="loading"
                    type="submit"
                    class="text4"
                    no-wrap
                    flat
                    no-caps
                  >
                    {{ editMode ? "Edit comment" : "Add Comment" }}
                  </q-btn>
                </form>
              </div>
            </div>
            <div class="q-pa-md q-mt-md row no-wrap items-center q-gutter-md">
              <!-- <div class="row items-center">
                <q-btn
                  @click="likePost('post', postData._id)"
                  round
                  size="10px"
                  color="primary"
                  :icon="
                    postData.likes.includes(store.userdetails._id)
                      ? 'fa-solid fa-thumbs-up'
                      : 'fa-regular fa-thumbs-up'
                  "
                />
                <span class="q-ml-sm">
                  {{ postData.likes.length }}
                </span>
              </div> -->
              <!-- <div class="row items-center">
                <q-btn
                  @click="dislikePost('post', postData._id)"
                  round
                  size="10px"
                  color="primary"
                  :icon="
                    postData.dislikes.includes(store.userdetails._id)
                      ? 'fa-solid fa-thumbs-down'
                      : 'fa-regular fa-thumbs-down'
                  "
                /><span class="q-ml-sm">
                  {{ postData.dislikes.length }}
                </span>
              </div> -->
              <q-btn
                @click="editPost('post', postData.id)"
                round
                color="primary"
                ><i
                  style="
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  class="fa-regular text-weight-bold text-h5 fa-pen-to-square"
                ></i
              ></q-btn>
              <q-btn
                @click="deletePost('post', postData.id)"
                round
                color="primary"
                ><i
                  style="
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  class="fa-solid fa-trash"
                ></i
              ></q-btn>
              <!-- <q-btn
                @click="editPost('post', postData.id)"
                round
                v-if="store.userdetails.email === postData.author.email"
                size="10px"
                color="primary"
                icon="fa-regular fa-pen-to-square"
              />
              <q-btn
                @click="deletePost('post', postData.id)"
                round
                v-if="store.userdetails.email === postData.author.email"
                size="10px"
                color="primary"
                icon="fa-solid fa-trash"
              /> -->
            </div>
          </div>

          <!-- {{ postData }} -->
        </div>

        <div class="left">
          <div class="row items-center justify-between q-mb-md">
            <div class="text4">Country</div>
            <div class="text2">
              <span class="text-h4">{{
                getCountryFlag(postData.country)
              }}</span>
            </div>
          </div>
          <div class="row items-center justify-between q-mb-md">
            <div class="text4">Date</div>
            <div class="text2">
              {{
                new Date(postData.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
            </div>
          </div>
          <!-- <div class="text4 q-mb-sm">Author</div>
          <div class="row items-center justify-between q-mb-md">
            <div style="gap: 0.5rem" class="text4 row items-center no-wrap">
              <img
                style="width: 32px; height: 32px; border-radius: 100%"
                src="/usersvg.svg"
                alt=""
              />
              {{ postData.name ? `${postData.name}` : `${"No nickname"}` }}
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { formatDistanceToNow, parseISO } from "date-fns";

import { Dialog, Loading, Notify } from "quasar";
import { authAxios, axios } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let router = useRouter();
let route = useRoute();
import { useMyAuthStore } from "src/stores/auth";
import countries from "app/countries";
let store = useMyAuthStore();
let postDialog = ref(false);
let post = ref({});
let postData = ref({});
let comment = ref("");
let commentsArr = ref([]);
let spin = ref(true);
let seamless = ref(false);
let loading = ref(false);
let editMode = ref(false);
let editPostMode = ref(false);
let commentToEdit = ref({});

const editPost = () => {
  post.value = { ...postData.value };
  editPostMode.value = true;
  seamless.value = true;
};
const editComment = (type, data) => {
  commentToEdit.value = data;
  comment.value = data.remark;
  editMode.value = true;
};

function getCountryFlag(countryName) {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName?.toLowerCase()
  );
  return country ? country.flag : "🏳️"; // Return white flag if country not found
}
const getPostDetail = () => {
  const slug = route.query.slug;
  authAxios
    .get(`donation/show/${slug}`, {
      cache: {
        maxAge: 0, // No caching for this specific request
      },
    })
    .then((response) => {
      console.log(response);
      postData.value = {
        ...response.data.data,
      };

      spin.value = false;
    })
    .catch(({ response }) => {});
};
const getPostComments = () => {
  const slug = route.query.slug;

  authAxios
    .get(`forum-comments/${slug}?populate=author`)
    .then(({ data }) => {
      // console.log(data);
      commentsArr.value = data.payload;
    })
    .catch(({ response }) => {});
};
const setPostStatus = () => {
  const slug = route.query.slug;
  if (postData.status === "available") {
    Loading.show();
    authAxios
      .post(`donation/update/status/${slug}?status=available`)
      .then(({ data }) => {
        console.log(data);
        postData.value = data.data;
        Loading.hide();
        // commentsArr.value = data.payload;
      })
      .catch(({ response }) => {
        Loading.hide();
      });
  } else {
    Loading.show();
    authAxios
      .post(`donation/update/status/${slug}?status=unavailable`)
      .then(({ data }) => {
        console.log(data);
        postData.value = data.data;
        Loading.hide();
        // commentsArr.value = data.payload;
      })
      .catch(({ response }) => {
        Loading.hide();
      });
  }
};
const createPost = () => {
  if (editPostMode) {
    loading.value = true;
    authAxios
      .put(`forums/${postData.value._id}`, {
        title: post.value.title,
        description: post.value.description,
      })
      .then((response) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        // console.log(response);
        editPostMode.value = false;
        getPostDetail();
        seamless.value = false;
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
        // console.log(response);
      });
  } else {
    loading.value = true;
    authAxios
      .post(`forums`, post.value)
      .then((response) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        // console.log(response);
        seamless.value = false;
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
        // console.log(response);
      });
  }
};
const likePost = (type, id) => {
  // loading.value = true;
  const slug = router.currentRoute.value.params.slug;

  if (type === "post") {
    authAxios
      .put(`forums/${slug}/like`)
      .then((response) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        // console.log(response);
        getPostDetail();
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
        // console.log(response);
      });
  } else {
    authAxios
      .put(`forum-comments/${slug}/${id}/like`)
      .then((response) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        // console.log(response);
        getPostComments();
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
        // console.log(response);
      });
  }
};
const deletePost = (type, id) => {
  // loading.value = true;
  const slug = router.currentRoute.value.params.slug;

  if (type === "post") {
    Dialog.create({
      title: "Delete post",
      message: "Are you sure you want to delete this post?",
    })
      .onOk(() => {
        authAxios
          .delete(`forums/${slug}`)
          .then((response) => {
            loading.value = false;
            Notify.create({
              message: response.data.message,
              color: "green",
              position: "top",
            });
            // console.log(response);
          })
          .catch(({ response }) => {
            loading.value = false;
            Notify.create({
              message: response.data.message,
              color: "red",
              position: "bottom",
              actions: [{ icon: "close", color: "white" }],
            });
            // console.log(response);
          });
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  } else {
    Dialog.create({
      title: "Delete comment",
      message: "Are you sure you want to delete this comment?",
    })
      .onOk(() => {
        authAxios
          .delete(`forum-comments/${slug}/${id}`)
          .then((response) => {
            loading.value = false;
            Notify.create({
              message: response.data.message,
              color: "green",
              position: "top",
            });
            // console.log(response);
          })
          .catch(({ response }) => {
            loading.value = false;
            Notify.create({
              message: response.data.message,
              color: "red",
              position: "bottom",
              actions: [{ icon: "close", color: "white" }],
            });
            // console.log(response);
          });
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }
};
const dislikePost = (type, id) => {
  // loading.value = true;
  const slug = router.currentRoute.value.params.slug;

  if (type === "post") {
    authAxios
      .put(`forums/${slug}/dislike`)
      .then((response) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        getPostDetail();

        // console.log(response);
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
        // console.log(response);
      });
  } else {
    authAxios
      .put(`forum-comments/${slug}/${id}/dislike`)
      .then((response) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        getPostComments();

        // console.log(response);
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
        // console.log(response);
      });
  }
};
const createComments = () => {
  if (comment.value === "") {
    Notify.create({
      message: "Please enter comment",
      color: "red",
      position: "top",
    });
  } else {
    if (editMode.value) {
      loading.value = true;
      authAxios
        .put(`donation/${route.query.slug}/comment/create`, {
          remark: comment.value,
        })
        .then((response) => {
          console.log(response);
          loading.value = false;
          Notify.create({
            message: response.data.message,
            color: "green",
            position: "top",
          });
          comment.value = "";
          editMode.value = false;
          getPostDetail();
        })
        .catch(({ response }) => {
          loading.value = false;
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    } else {
      loading.value = true;
      authAxios
        .post(`donation/${route.query.slug}/comment/create`, {
          remark: comment.value,
        })
        .then((response) => {
          console.log(response);
          comment.value = "";
          loading.value = false;
          Notify.create({
            message: response.data.message,
            color: "green",
            position: "top",
          });
          getPostDetail();
        })
        .catch(({ response }) => {
          loading.value = false;
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    }
  }
};

onMounted(() => {
  try {
    getPostDetail();
    // getPostComments();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.main_area {
  margin: 1rem;
}
.section_sub {
  text-align: left;
  text-transform: cauthAxiostalize;
  margin: 0;
}
.section_sub_ {
  font-weight: 600;
}

.text4 {
  font-weight: 500;
}
.details .text4 {
  font-weight: 500;
  color: #141c24;
}

.text2 {
  color: #637083;
}
.text2.comments {
  color: #344051;
}

.q-btn.text2 {
  color: #344051;
  font-weight: 500;
  padding: 0;
  margin-bottom: 1rem;
}

.div {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.div .text4 {
  color: #141c24;
  margin-bottom: 0.5rem;
}
.div .text2 {
  margin-left: 2rem;
  font-size: 12px;
}
.q-card {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 17px 33px -2px rgba(28, 39, 49, 0.05);
}

.div .details .text2 {
  margin-left: 0;
}
.div .details .text4 {
  margin-bottom: 0;
}
.div .img {
  position: relative;
}
.div .img img.verify {
  position: absolute;
  bottom: 5%;
  right: 2%;
}

.column {
  gap: 1rem;
}

.cancel {
  border-radius: 8px;
  background: #fff;
  width: 100%;
  padding: 10px 20px;
  box-shadow: 0px 0px 0px 2px #fccece;
}
.note {
  color: #005999;

  border-radius: 10px;
  background: #e5f4ff; /* Paragraph S/Medium */

  font-size: 14px;
  padding: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}

.q-btn.apply {
  width: 100%;
}

.left {
  border-radius: 8px;
  padding: 16px;
  max-width: 250px;
  height: fit-content;
  position: sticky;
  top: 5%;
}

.div {
  margin: 1.5rem 0;
}

.right select {
  border-radius: 8px;
  border: 1px solid #ced2da;
  background: #fff;
  max-width: 184px;
  padding: 8px 8px 8px 12px;
}

.right .act_btn {
  border-radius: 8px;
  border: 1px solid #ced2da;
  background: #fff;
  padding: 8px 8px 8px 12px;
  color: #637083;
}

.grid {
  grid-template-columns: 3fr 1fr;
}

.comment_input form {
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: #e5f4ff;
  padding: 12px;
}
.comment_input form textarea {
  border: none;
  background: transparent;
  width: 100%;
}
.comment_input form .q-btn {
  color: #fff;
  border-radius: 8px;
  border: 1px solid #fff;
  background: #39ac73;
  box-shadow: 0px 0px 0px 2px #99c2ff;
  padding: 8px 16px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 2fr 1fr;
  }

  .left {
    max-width: 250px;
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 2fr 1fr;
  }

  .left {
    max-width: 250px;
  }
}
</style>
