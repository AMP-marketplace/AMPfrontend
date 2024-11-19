<template>
  <div v-if="spin" class="spinner">
    <q-spinner color="primary" size="3em" />
  </div>
  <q-layout v-else class="bg_grey overflow-hidden">
    <div class="back q-mt-lg q-pa-md">
      <q-btn :to="{ name: 'donate' }" class="text2" flat no-caps>
        <i class="fa-solid q-mr-sm fa-arrow-left"></i>Back to all listings
      </q-btn>
    </div>
    <div class="row container q-pt-lg items-center justify-end">
      <p class="text-h6 q-mr-sm">
        Status :
        <q-badge
          class="q-pa-md text-weight-bold"
          :color="
            postData.status === 'available'
              ? 'green'
              : postData.status === 'donated'
              ? 'teal'
              : 'red'
          "
        >
          {{ postData.status }}
        </q-badge>
        <!-- <q-badge
          class="q-pa-md text-weight-bold"
          :color="postData.status === 'available' ? 'green' : 'red'"
        >
          {{ postData.status }}
        </q-badge> -->
      </p>
      <q-btn-dropdown
        v-if="store.userdetails.email === postData.owner.email"
        no-caps
        no-wrap
        color="primary"
        label=" Set status"
      >
        <q-list>
          <q-item
            :disable="postData.status === 'available'"
            clickable
            v-close-popup
            @click="setPostStatus('available')"
          >
            <q-item-section>
              <q-item-label>Available</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            :disable="postData.status === 'unavailable'"
            clickable
            v-close-popup
            @click="setPostStatus('unavailable')"
          >
            <q-item-section>
              <q-item-label>Unavailable</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            :disable="postData.status === 'donated'"
            clickable
            v-close-popup
            @click="setPostStatus('donated')"
          >
            <q-item-section>
              <q-item-label>Donated</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div class="bg-white main_area q-py-md q-py-lg">
      <div v-if="postData?.media?.length">
        <q-carousel
          :autoplay="true"
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
        >
          <q-carousel-slide
            style="background-size: contain; background-repeat: no-repeat"
            :name="index + 1"
            v-for="(images, index) in postData?.media"
            :key="index"
            :img-src="images.url"
          />
        </q-carousel>
      </div>
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
            <div v-if="postData?.comments?.length">
              <div
                v-for="(comment, index) in postData.comments"
                :key="index"
                class="div"
              >
                <div @click="showPersonDetailsFCN(comment.author)" class="img">
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
                <div
                  style="width: 100%"
                  class="details row items-center justify-between"
                >
                  <div>
                    <div
                      @click="showPersonDetailsFCN(comment.author)"
                      class="text4"
                    >
                      {{
                        comment.author.name
                          ? `${comment.author.name}`
                          : `${comment.author.email}`
                      }}
                    </div>
                    <div class="text2">
                      {{
                        formatDistanceToNow(parseISO(comment.created_at), {
                          addSuffix: true,
                        })
                      }}
                      <br />
                      <small
                        v-if="store.userdetails.email === comment.author.email"
                        class="text-italic text-secondary"
                        >You made this comment</small
                      >
                    </div>

                    <div class="comments">
                      {{ comment.remark }}
                    </div>
                  </div>

                  <div style="gap: 1rem" class="row items-center no-wrap">
                    <q-btn
                      @click="chatPerson(comment.author)"
                      flat
                      v-if="
                        store.userdetails.email === postData.owner.email &&
                        store.userdetails.email !== comment.author.email
                      "
                      :loading="loadingChatBtn"
                      no-caps
                      no-wrap
                      class="bg-green-7 text-white"
                    >
                      <i class="ri-chat-2-line q-mr-sm"></i> Chat person
                    </q-btn>
                    <q-btn
                      @click="deleteReview(comment)"
                      round
                      v-if="store.userdetails.email === comment.author.email"
                      color="secondary"
                      ><i
                        style="
                          width: 30px;
                          height: 35px;
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
            <div
              v-if="store.userdetails.email === postData.owner.email"
              style="gap: 0.5rem"
              class="q-pa-md q-mt-md row items-center justify-center"
            >
              <q-btn @click="editPost(postData)" no-wrap no-caps color="primary"
                >Edit Donation<i
                  style="
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  class="fa-regular text-weight-bold text-h6 fa-pen-to-square"
                ></i
              ></q-btn>
              <q-btn
                @click="deletePost(postData.id)"
                no-caps
                no-wrap
                color="secondary"
                >Delete Donation<i
                  style="
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  class="fa-solid fa-trash"
                ></i
              ></q-btn>
              <q-btn
                color="red-7"
                class="q-md-xl q-mr-sm q-py-xs"
                no-wrap
                @click="actionsModal = !actionsModal"
                no-caps
              >
                Actions
              </q-btn>
              <q-btn
                color="primary"
                class="q-md-xl q-py-xs"
                no-wrap
                @click="AddProductImageModal = !AddProductImageModal"
                no-caps
                type="submit"
              >
                {{
                  postData?.media?.length ? "Add another image" : "Upload image"
                }}
              </q-btn>
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
          <div class="row items-center justify-between q-mb-md">
            <div class="text4">Owner</div>
            <div class="text2">
              {{ postData.owner.name }}
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
    <q-dialog v-model="showPersonDetailsModal">
      <q-card>
        <div class="column items-center justify-center text-center">
          <div>
            <img
              style="width: 60px; height: 60px; border-radius: 100%"
              src="/images/usersvg.svg"
              alt=""
            />
          </div>
          <p><strong>Name:</strong> {{ showPersonDetails.name }}</p>
          <p>
            <strong>Email:</strong> {{ showPersonDetails.email }}
            <span
              v-if="showPersonDetails.email_verified_at"
              class="text-green text-weight-bold"
              >Verified</span
            >
          </p>
          <p>
            <strong>Phone:</strong>
            <a target="_blank" :href="showPersonDetails.phone">{{
              showPersonDetails.phone
            }}</a>
          </p>

          <div style="gap: 1rem" class="row q-mt-md items-center no-wrap">
            <q-btn
              @click="chatPerson(showPersonDetails)"
              no-wrap
              no-caps
              color="primary"
            >
              Chat person
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- max-file-size="512000"
          @rejected="onRejected" -->
    <q-dialog v-model="AddProductImageModal">
      <q-card>
        <div>
          <h6 class="text-h6 text-center">Do you want to add another image?</h6>
        </div>
        <q-file
          @update:model-value="setProductImage"
          accept=".png,.jpeg,.jpg,.webp"
          class="column profile_field justify-center items-center"
          v-model="AnotherproductImageFile"
        >
          <div class="img q-mb-sm">
            <img src="../../assets/upload.svg" alt="" />
          </div>
          <div class="smallText">Upload another image</div>
        </q-file>
      </q-card>
    </q-dialog>
    <q-dialog v-model="actionsModal">
      <q-card>
        <q-list
          v-if="postData?.media?.length"
          bordered
          separator
          padding
          class="rounded-borders"
        >
          <q-item-label header>Images</q-item-label>

          <q-item
            v-for="(images, index) in postData?.media"
            :key="index"
            clickable
            v-ripple
          >
            <q-item-section avatar top>
              <q-avatar>
                <img :src="images.url" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Image {{ index + 1 }}</q-item-label>
              <q-item-label caption>{{ images.size }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div style="gap: 1rem" class="row items-center no-wrap">
                <q-btn @click="deleteImageProps(images)" color="red-7"
                  ><i class="fa-solid fa-trash"></i
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else>
          <p>You have not uploaded any images</p>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDonationModal">
      <q-card>
        <div class="top_modal row items-center justify-between">
          <h4 class="text1">
            {{ "Edit donation" }}
          </h4>

          <q-btn @click="editDonationModal = !editDonationModal" flat rounded>
            <img src="../../assets/circle.svg" alt="" />
          </q-btn>
        </div>

        <q-separator class="q-mt-lg" />
        <div class="auth">
          <div
            v-if="showAddDonateImage"
            style="gap: 1rem"
            class="input justify-between column items-center no-wrap"
          >
            <div class="smallText text-weight-bold">
              Note that this will be your main/display product image
            </div>
            <!-- {{ addedDonationObj }} -->
            <!-- max-file-size="512000"
              @rejected="onRejected" -->
            <q-file
              @update:model-value="setDonateImage"
              accept=".png,.jpeg,.jpg"
              class="column profile_field justify-center items-center"
              v-model="donateImageFile"
            >
              <div class="img q-mb-sm">
                <img src="../../assets/upload.svg" alt="" />
              </div>
              <div class="smallText">Upload image</div>
            </q-file>
          </div>
          <form v-else @submit.prevent="editDonationFCN">
            <div class="input_wrap">
              <label for=""> Name <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.name"
                  placeholder="Enter product name"
                  required
                  type="text"
                />
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Description <span>*</span></label>
              <div class="input editor">
                <q-editor v-model="data.description" min-height="5rem" />
              </div>
            </div>

            <div class="auth_grid">
              <div class="input_wrap">
                <label for="">Country<span>*</span></label>
                <div class="input">
                  <select v-model="data.country" required>
                    <option disabled value="">Choose</option>
                    <option
                      v-for="country in countries"
                      :key="country.name"
                      :value="country.name"
                    >
                      {{ country.name }} {{ country.flag }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Condition <span>*</span></label>
                <div class="input">
                  <select v-model="data.condition">
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="refurbished">Refurbished</option>
                    <option value="pre-owned">Pre owned</option>
                    <option value="open_box">Open Box</option>
                    <option value="lease_to_own">Lease to Own</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row justify-end q-mt-lg">
              <q-btn
                color="primary"
                class="q-px-xl q-py-sm"
                rounded
                no-wrap
                no-caps
                type="submit"
              >
                Edit donation
              </q-btn>
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="chatModal" persistent class="chatDialog">
      <div>
        <ChatPage
          :product="product"
          :conversationMessages="conversationMessages"
          :conversationDetails="conversationDetails"
          @closeModal="closeModalToggle"
        />
      </div>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { formatDistanceToNow, parseISO } from "date-fns";
import ChatPage from "src/components/ChatPage.vue";
import { Dialog, Loading, Notify, QSpinnerOval } from "quasar";
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
let data = ref({});
let product = ref({ rating: 0 });
let postData = ref({});
let comment = ref("");
let commentsArr = ref([]);
let spin = ref(true);
let seamless = ref(false);
let conversationDetails = ref({});
let errors = ref({});
let conversationMessages = ref([]);
let actionsModal = ref(false);
let loading = ref(false);
let editMode = ref(false);
let editPostMode = ref(false);
let donateImageFile = ref(null);
let AnotherproductImageFile = ref(null);
let donateImagePreview = ref("");
let showAddDonateImage = ref(false);
let loadingChatBtn = ref(false);
let AddProductImageModal = ref(false);
let slide = ref(1);
let editDonationModal = ref(false);
let chatModal = ref(false);
let commentToEdit = ref({});
let addedDonationObj = ref({});
let showPersonDetails = ref({});
let showPersonDetailsModal = ref(false);

const showPersonDetailsFCN = (details) => {
  showPersonDetails.value = details;
  showPersonDetailsModal.value = true;
};
const editPost = () => {
  data.value = { ...postData.value };
  editPostMode.value = true;
  editDonationModal.value = true;
};
const editComment = (type, data) => {
  commentToEdit.value = data;
  comment.value = data.remark;
  editMode.value = true;
};
let chatPerson = (author) => {
  Loading.show();
  authAxios
    .post(`chat/create-or-get`, {
      participant_one_id:
        store.userdetails.roles[0].name === "merchant"
          ? store.storedetails.id
          : store.userdetails.id,
      participant_one_type:
        store.userdetails.roles[0].name === "shopper"
          ? "user"
          : store.userdetails.roles[0].name,
      participant_two_id: author.id,
      participant_two_type:
        author.roles[0].name === "shopper"
          ? "user"
          : store.userdetails.roles[0].name,
    })
    .then((response) => {
      loadingChatBtn.value = false;
      console.log(response);
      conversationDetails.value = response.data.data;
      chatModal.value = true;
      Loading.hide();
      // getConversations(response.data.conversation.id);
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();
      if (response.data.message === "The user id field is required.") {
        Notify.create({
          message: "You need to be logged in to start a conversation",
          position: "top",
          color: "red",
        });

        Dialog.create({
          title: "Authenticate",
          message: `Please login to start conversation with vendor`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            route.replace({
              name: "customer.login",
              query: {
                redirect: signleRouteData.name,
              },
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }

      loadingChatBtn.value = false;
      errors = response.data.errors || {};
    });
  // chat = true;
};
function getCountryFlag(countryName) {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName?.toLowerCase()
  );
  return country ? country.flag : "🏳️"; // Return white flag if country not found
}
const onRejected = () => {
  Notify.create({
    type: "negative",
    position: "top",
    message: `Your upload size should be less than 500kb `,
  });
};
const closeModalToggle = () => {
  chatModal.value = false;
};
const setProductImage = (props) => {
  AnotherproductImageFile.value = props;

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading product image...",
  });
  const formData = new FormData();
  formData.append("media[]", AnotherproductImageFile.value);
  authAxios
    .post(`donation/media/upload/${postData.value.slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      postData.value = response.data.data;
      // getProducts();
      Notify.create({
        message: response.data.message + ", successfully added.",
        color: "green",
        position: "top",
      });
      Loading.hide();
      AnotherproductImageFile.value = null;
      AddProductImageModal.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const deleteImageProps = (imageData) => {
  Dialog.create({
    title: "Confirm",
    message: "Would you like to delete this image?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting...",
      });
      authAxios
        .post(
          `donation/media/remove/${postData.value.slug}?key=${imageData.key}`
        )
        .then((response) => {
          console.log(response);

          Notify.create({
            message:
              response.data.message ||
              "You have successfully deleted this image.",
            color: "green",
            position: "top",
          });
          // getProducts();
          actionsModal.value = false;
          Loading.hide();
        })
        .catch(({ response }) => {
          // console.log(response);
          Loading.hide();
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    })

    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const setDonateImage = (props) => {
  donateImageFile.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    donateImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
  const formData = new FormData();
  formData.append("media[]", donateImageFile.value);
  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading image...",
  });

  authAxios
    .post(`donation/media/upload/${addedDonationObj.value.slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      postData.value = response.data.data;
      Notify.create({
        message: response.data.message + ", donate successfully added.",
        color: "green",
        position: "top",
      });
      Loading.hide();
      donateImageFile.value = null;
    })
    .catch(({ response }) => {
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const editDonationFCN = () => {
  let dataToSend = {
    ...data.value,
  };
  Loading.show();
  authAxios
    .post(`donation/create`, {
      ...dataToSend,
    })
    .then((response) => {
      console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      data.value = { description: "" };
      addedDonationObj.value = response.data.data;
      showAddDonateImage.value = true;
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message
          ? response.data.message
          : Object.values(response.data.errors) + ",",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

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

const setPostStatus = (value) => {
  const slug = route.query.slug;

  Loading.show();
  authAxios
    .post(`donation/update/status/${slug}?status=${value}`)
    .then(({ data }) => {
      console.log(data);
      postData.value = data.data;
      Loading.hide();
      // commentsArr.value = data.payload;
    })
    .catch(({ response }) => {
      Loading.hide();
    });
};
const createPost = () => {
  if (editPostMode.value) {
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

const deleteReview = (review) => {
  Dialog.create({
    title: "Note",
    message: `Are you sure you want to delete this comment?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting comment...",
      });
      authAxios
        .delete(`review/delete/${review.id}`)
        .then(({ data }) => {
          Loading.hide();
          Notify.create({
            message: data.message,
            color: "green",
            position: "top",
          });
          console.log(data);
        })
        .catch(({ response }) => {
          Loading.hide();
          loading.value = false;
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const deletePost = (id) => {
  // loading.value = true;
  const slug = route.query.slug;

  if (type === "post") {
    Dialog.create({
      title: "Delete donation",
      message: "Are you sure you want to delete this donation?",
    })
      .onOk(() => {
        authAxios
          .delete(`donation/delete/${slug}`)
          .then((response) => {
            loading.value = false;
            Notify.create({
              message: response.data.message,
              color: "green",
              position: "top",
            });
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
          postData.value = response.data.data;
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
          postData.value = response.data.data;
          comment.value = "";
          loading.value = false;
          Notify.create({
            message: response.data.message,
            color: "green",
            position: "top",
          });
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
  line-height: 1.5;
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0.7rem;
  border-radius: 8px;
  max-width: 600px;
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
    grid-template-columns: 1fr;
  }

  .left {
    max-width: 250px;
  }
  .right {
    margin-left: -2%;
  }
}
</style>
