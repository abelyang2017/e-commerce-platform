<template>
  <!-- 熱門票券 -->
  <div class="w-10/12 mx-auto px-4 py-8">
    <h2 class="mb-6 text-2xl font-bold text-gray-900">熱門票券</h2>
    <div class="tickets-grid">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="ticket-card"
        role="button"
        tabindex="0"
        @click="goCuponTicket(ticket)"
      >
        <!-- 左側 Logo -->
        <div class="ticket-logo">
          <img :src="ticket.image" :alt="ticket.storeName" class="ticket-logo-img" />
        </div>

        <!-- 中間資訊區域 -->
        <div class="ticket-info">
          <div class="ticket-store">{{ ticket.storeName }}</div>
          <div class="ticket-name">{{ ticket.ticketName }}</div>
        </div>

        <!-- 右側票券存根（黃色區域） -->
        <div class="ticket-stub">
          <!-- 左側虛線穿孔 -->
          <div class="stub-perforation" aria-hidden="true"></div>
          <!-- 中央圓形穿孔 -->
          <div class="stub-notch" aria-hidden="true"></div>

          <div class="stub-points">{{ ticket.points }}積分</div>
          <button class="stub-btn" type="button" @click="goCuponTicket(ticket)">兌換</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoresStore } from '@/stores/StoresStores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'HomeTickets',
})

const storesStore = useStoresStore()
const { tickets } = storeToRefs(storesStore)

const router = useRouter()

const goCuponTicket = (ticket) => {
  router.push({ name: 'CuponTicket', params: { id: ticket.id } })
}
</script>

<style scoped>
/* 票券列表：用 CSS 重做（取代大量 Tailwind class） */
.tickets-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .tickets-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


.ticket-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 150px; /* ✅ 中間不爆版 */
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}


.ticket-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.ticket-logo {
  aspect-ratio: 1 / 1;             /* ✅ 永遠正方形，高度跟著寬度走 */
  padding: 8px;
  box-sizing: border-box;
  display: grid;
}

.ticket-logo-img {
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  display: block;
}


@media (min-width: 768px) {
  .ticket-logo {
    width: 130px;
    height: 130px;
  }
}

.ticket-info {
  min-width: 0;
  padding: 12px 16px;
}


.ticket-store {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 768px) {
  .ticket-store {
    font-size: 16px;
  }
}

.ticket-name {
  font-size: 12px;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 768px) {
  .ticket-name {
    font-size: 14px;
  }
}

.ticket-stub {
  width: 150px;
  background: #facc15;
  position: relative;
  display: grid;
  place-items: center;
  padding: 16px 12px;
  border-radius: 0 16px 16px 0;
}


@media (min-width: 768px) {
  .ticket-stub {
    width: 150px;
  }
}

.stub-perforation {
  position: absolute;
  left: -1.2px;
  top: 0;
  height: 100%;
  width: 1px;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 0,
    #d19d02 6px,
    #d19d02 10px
  );
}

.stub-notch {
  position: absolute;
  left: -18px;
  top: 50%;
  transform: translateY(-60%);
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  background: #ffffff;
}

.stub-points {
  font-size: 28px;
  font-weight: 400;
  color: #111827;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.2;
}

.stub-btn {
  width: 100%;
  border: 0;
  border-radius: 9999px;
  background: #ffffff;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  transition: background 150ms ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* .stub-btn:hover {
  background: #f3f4f6;
} */
</style>

