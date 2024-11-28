<template>
  <div>
    <q-card class="card">
      <div class="dialog_content">
        <div class="dialog_top advert">
          <div class="left_dialog">
            <img src="/images/usersvg.svg" alt="" />
          </div>
          <div class="det">
            <!-- {{ conversationDetails.participants[1] }} -->
            <div class="title name_top">
              {{
                conversationDetails?.participants[1]?.data?.business_name
                  ? conversationDetails?.participants[1]?.data?.business_name
                  : conversationDetails?.participants[1]?.data?.name
              }}
            </div>
            <div class="name_down act text-weight-bold">Active</div>
            <div
              v-if="conversationDetails?.participants[1]?.data?.name"
              class="name_down act text-center text-weight-bold"
            >
              Dear Esteemed customer please delivery options and cost with
              Vendors
            </div>
          </div>
        </div>
        <!--  <div
          v-if="productData || $store.leegoluauth.vendorDetails.name"
          class="dialog_top advert"
        >
          <div class="left_dialog">
            <img src="/images/usersvg.svg" alt="" />
          </div>

          <div class="det">
            <div class="title name_top">
              {{
                productData.vendor_name
                  ? productData.vendor_name
                  : $store.leegoluauth.vendorDetails.name
              }}
            </div>
            <div class="name_down act text-weight-bold">Active</div>
          </div>
        </div>
        <div v-if="productData" class="dialog_top advert">
          <div class="left_dialog">
            <img :src="productData.uploads[0].url" alt="" />

          </div>

          <div class="det">
            <div class="title name_top">{{ productData?.name }}</div>
            <div class="name_down text-black">
              ₦{{ productData?.price.toLocaleString() }}
            </div>
          </div>
        </div> -->
        <div class="chatArea">
          <p class="text-center today">Today</p>
          <div
            v-if="conversationDetails?.messages.length"
            style="width: 100%; max-width: 400px"
          >
            <div ref="myDiv" id="myDiv" class="message_wrap">
              <div
                v-for="(chat, index) in conversationDetails?.messages"
                :key="index"
              >
                <div
                  :class="
                    chat?.sender?.roles[0].name === 'shopper'
                      ? 'user chat'
                      : 'vendor chat'
                  "
                >
                  <div class="div">
                    <span>
                      <img
                        style="width: 13px; height: 13px"
                        src="/images/usersvg.svg"
                        alt=""
                      />
                    </span>
                    <span>
                      {{ chat.message }}
                    </span>
                  </div>
                  <span class="time">
                    {{
                      new Date(chat.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </span>
                </div>

                <!-- <div
                  v-if="
                    chat.is_authenticated_user_author === false &&
                    store?.userdetails?.roles[0].name !== 'shopper'
                  "
                  class="vendor chat"
                >
                  <div class="div">
                    <span>{{ chat.message }} </span>
                  </div>
                  <span class="time">
                    {{
                      new Date(chat.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </span>
                </div> -->
              </div>
            </div>
          </div>
          <div v-else class="start">
            <img src="/images/convo.svg" alt="" />
            <div class="text">Start a convo</div>
          </div>

          <div class="input_area q-mt-lg">
            <p
              v-if="!errorConnectingToChatServer"
              class="text-red-7 text-center q-mb-sm text-weight-bold"
            >
              <small>
                We could not connect you to our chat server at this time, please
                wait...</small
              >
            </p>
            <div class="inp_wra">
              <q-btn
                rounded
                class="emojibtn"
                style="min-height: auto; padding: auto"
                flat
                id="emoji-button"
                data-action="insert_emoticon"
                @click="closeEmojiModal"
              >
                <i class="fa-solid fa-face-smile"></i>
              </q-btn>

              <div class="emojs">
                <EmojiPicker
                  v-if="toggleEmojiPicker"
                  :native="true"
                  v-click-outside="() => hideDropdown()"
                  @select="onSelectEmoji"
                />
              </div>
              <input
                v-model="newMessage"
                type="text"
                :disabled="!errorConnectingToChatServer"
                ref="message_box"
                placeholder="Type something...."
              />

              <div class="row no-wrap items-center">
                <q-btn
                  style="min-height: auto; padding: auto"
                  class="text-secondary sendbtn"
                  @click="sendMessage"
                  :loading="sendingMessageLoading"
                  flat
                >
                  <i class="ri-send-plane-2-fill text-h5"></i>
                  <!-- <i class="fa-sharp fa-solid fa-paper-plane-top"></i> -->
                  <!-- <img src="/images/mess.svg" alt="" /> -->
                </q-btn>
                <!-- <i class="fa-solid fa-microphone"></i> -->
              </div>
            </div>
          </div>
          <p v-if="typingIndicator">{{ typingIndicator }}</p>
        </div>

        <q-btn @click="closeModal" class="close">
          <i class="ri-close-line"></i>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { inject, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import clickOutside from "vue3-clickoutside-component";
import Pusher from "pusher-js";
import "vue3-emoji-picker/css";
import { useMyAuthStore } from "src/stores/auth";

let store = useMyAuthStore();
let whispering = ref(false);
let listening = ref(false);
let listeningEmoji = ref(false);
const showEmojiPicker = ref(false);
const sendingMessageLoading = ref(false);
let emojiDialogToggle = ref(false);
let loadingChatBtn = ref(false);
let typingIndicator = ref("");
let toggleEmojiPicker = ref(false);
let errorConnectingToChatServer = ref(false);
let myDiv = ref();
let errors = ref({});
let message = ref([]);
let newMessage = ref("");
let channel = ref(null);
let data = ref({
  message: "",
});
let props = defineProps({
  product: Object,
  conversationMessages: Array,
  conversationDetails: Object,
  // "conversationMessages",
  // "productData",
});

const emit = defineEmits(["closeModal"]);
Pusher.logToConsole = true;
// Access the globally available Pusher instance
const pusher = new Pusher("f71ee69f460a2ede9930", {
  cluster: "eu",
  authEndpoint: "https://agora.lyt24tech.com/api/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${store.token}`, // Replace with your auth token
    },
  },
});
channel = pusher.subscribe(`private-${props.conversationDetails.slug}`);
channel.bind("pusher:subscription_succeeded", () => {
  errorConnectingToChatServer.value = true;
  console.log("Successfully subscribed to the channel");
});
channel.bind("pusher:subscription_error", (status) => {
  errorConnectingToChatServer.value = false;
  console.error("Subscription error:", status);
});
// // Listen for incoming messages
// channel.bind("message.delivered", (data) => {
//   console.log(data);
//   if (store.userdetails.id === data.sender_id) {
//     let newData = {
//       ...data,
//       is_authenticated_user_author: true,
//       message: data.content,
//     };

//     props.conversationDetails.messages.push(newData);
//   }
// });
// Pusher.logToConsole = true;
let scrollToBottom = () => {
  nextTick(() => {
    const scrollDiv = document.getElementById("myDiv");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  });
};
function hideDropdown() {
  console.log("close dropdown");
  toggleEmojiPicker.value = !toggleEmojiPicker;
}

let closeEmojiModal = () => {
  toggleEmojiPicker.value = !toggleEmojiPicker.value;
};
// Add emoji to the input field

let closeModal = () => {
  emit("closeModal");
};

let onSelectEmoji = (emoji) => {
  console.log(emoji);
  newMessage.value += emoji.i + " ";
};

let sendMessage = () => {
  console.log(props.conversationDetails);
  if (newMessage.value === "") {
    Notify.create({
      message: "Type in a message",
      color: "red",
      position: "top",
    });
    return;
  }
  sendingMessageLoading.value = true;
  authAxios
    .post(`chat/${props.conversationDetails.slug}/message/send`, {
      sender_id: store?.userdetails?.id,
      sender_type: store?.userdetails?.roles[0].name,
      message: newMessage.value,
      // sender_id: store.userdetails.id,
      // sender_type: store.userdetails.roles
      //   ? store.userdetails.roles[0].name
      //   : store.userdetails.role[0].name,
    })
    .then((response) => {
      sendingMessageLoading.value = false;
      console.log(response);

      scrollToBottom();
    })
    .catch(({ response }) => {
      console.log(response);
      if (props.conversationDetails.messages.length > 1) {
        props.conversationDetails.messages.pop();
      }
      sendingMessageLoading.value = false;
      Notify.create({
        message: response.data.message,
        position: "top",
        color: "red",
      });

      errors.value = response.data.errors || {};
    });
};

onMounted(() => {
  if (props.conversationDetails.messages.length) {
    scrollToBottom();
    const scrollDiv = document.getElementById("myDiv");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    let lastChildDiv = scrollDiv.lastElementChild;
    console.log(lastChildDiv);
    lastChildDiv.scrollIntoView({ behavior: "smooth", block: "end" });
  }
  Pusher.logToConsole = true;
  const pusher = new Pusher("f71ee69f460a2ede9930", {
    cluster: "eu",
    authEndpoint: "https://agora.lyt24tech.com/api/v1/broadcasting/auth", // Adjust the endpoint as needed
    auth: {
      headers: {
        Authorization: `Bearer ${store.token}`, // Replace with your auth token
      },
    },
  });

  channel = pusher.subscribe(`private-${props.conversationDetails.slug}`);
  channel.bind("pusher:subscription_succeeded", () => {
    errorConnectingToChatServer.value = true;
    console.log("Successfully subscribed to the channel");
  });
  channel.bind("pusher:subscription_error", (status) => {
    errorConnectingToChatServer.value = false;
    console.error("Subscription error:", status);
  });
  channel.bind("client-typing", (data) => {
    if (store.userdetails.id === data.sender_id) {
      // Don't show typing indicator for the current user
      typingIndicator.value = `${
        data.user_name ? data.user_name : ""
      } is typing...`;
    }
  });

  channel.bind("client-stopped-typing", (data) => {
    if (store.userdetails.id === data.sender_id) {
      typingIndicator.value = ""; // Clear the typing indicator
    }
  });
  channel.bind("message.delivered", (data) => {
    console.log("Message received:", data);
    sendingMessageLoading.value = false;
    newMessage.value = "";
    Notify.create({
      message: "Message sent",
      color: "green",
      position: "top",
    });
    if (store.userdetails.id === data.sender_id) {
      console.log(store.userdetails.id === data.sender_id);
      let newData = {
        ...data,
        // is_authenticated_user_author: true,
        // message: data.content,
      };

      props.conversationDetails.messages.push(newData);
      scrollToBottom();
    } else {
      let newData = {
        ...data,
        // message: data.message,
      };

      props.conversationDetails.messages.push(newData);
      scrollToBottom();
    }
    console.log(data);
    console.log(props.conversationDetails.messages);
  });

  // Pusher.logToConsole = true;
});

onBeforeUnmount(() => {
  if (channel) {
    channel.unbind("message.delivered");
    channel.unsubscribe();
  }
});
</script>

<style lang="scss" scoped>
// dialog

.card {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  min-width: 366px;
  overflow: hidden;
  // height: 522px;
}

.dialog_content .dialog_top:first-of-type {
  margin-top: 0;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  position: relative;
}
.dialog_content .dialog_top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 0.5rem 0 0;
}

.message_wrap {
  height: 200px;
  overflow-y: scroll;
}

.message_wrap::-webkit-scrollbar {
  display: none;
}

.dialog_content .dialog_top.advert:nth-child(1) {
  border-bottom: 1px solid #c3c3c3b2;
  padding: 0.5rem 1rem 0.5rem;
}
.dialog_content .dialog_top.advert:nth-child(2) {
  border-bottom: 1px solid #c3c3c3b2;
  padding: 0rem 1rem 0.5rem;
  margin: 0.5rem 0 0;
}

.div {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.sendbtn {
  padding: 10px;
  // font-size: 3rem !important;
}

.sendbtn img {
  width: 16.33px;
  height: 18.67px;
}

.dialog_content .dialog_top img {
  border: 3px solid #1f7bb5;
  border-radius: 26.5px;
  width: 53px;
  height: 53px;
}

.chatArea {
  background: rgba(31, 123, 181, 0.28);
  padding: 1rem 0.5rem;
}
p.today {
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #1f7bb5;
}

.dialog_content .boost .q-btn {
  width: 100%;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 5px;
  text-transform: capitalize;
}

.dialog_content .boost {
  padding: 0.5rem 0;
}

.dialog_content {
  .close {
    position: absolute;
    top: 2%;
    right: -1%;
    color: #000;
    font-size: 1rem;
  }
}
.dialog_content .close i {
  color: #979797;
  font-size: 1.3rem;
}
.dialog_content .close::before {
  box-shadow: none;
}

p.advert {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}

.input_area {
  position: relative;
}

.input_area .inp_wra {
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  padding: 0.3rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  position: relative;
  height: 45px;
  margin: 0rem 0rem 0;
  justify-content: space-between;
}

.inp_wra .emojibtn {
  padding: 0;
}

.emojs {
  position: absolute;
  bottom: 0;
  z-index: 9;
}
.input_area .inp_wra input {
  border: none;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  background: transparent;
  width: 100%;
  color: #000000;
}

.input_area .inp_wra input::placeholder {
  color: #9a9a9a;
}
.input_area .inp_wra i.fa-face-smile {
  color: rgba(31, 123, 181, 0.73);
  font-size: 1.5rem;
}
.input_area .inp_wra i.fa-microphone {
  background: #1f7bb5;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.chat {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  margin: 1rem 0;
  // margin: 1.3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.3rem;
  // width: 80%;
  width: fit-content;
  text-align: left;
}

.start {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.4rem;
}
.start img {
  width: 72px;
  height: 72px;
}
.start .text {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

  text-align: center;

  color: #357196;
}

.chat.vendor {
  color: #fff;
  background: #1f7bb5;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 1rem;
  margin-left: auto;
}
.chat.user {
  color: #1f7bb5;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-right: auto;
}

.chat.user img {
  width: 13px;
  height: 13px;
  box-shadow: inset 0px -4px 4px rgba(0, 0, 0, 0.47);
  border-radius: 26.5px;
}

.chat span.time {
  font-style: normal;
  font-weight: 500;
  font-size: 7px;
  line-height: 8px;
}

.chat.user span.time {
  color: rgba(196, 196, 196, 0.7);
}

.chat.vendor span.time {
  color: rgba(255, 255, 255, 0.7);
}
</style>
