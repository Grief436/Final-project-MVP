<template>
  <div class="page dashboard">
    <header class="top-bar">
      <h1>My Items</h1>
      <button @click="logout">Logout</button>
    </header>

    <section class="form">
      <h2>{{ editingId ? 'Edit Item' : 'New Item' }}</h2>
      <form @submit.prevent="saveItem">
        <input v-model="form.title" placeholder="Title" required />
        <textarea v-model="form.description" placeholder="Description" required />
        <button type="submit">
          {{ editingId ? 'Update' : 'Create' }}
        </button>
        <button v-if="editingId" type="button" @click="cancelEdit">Cancel</button>
      </form>
    </section>

    <section class="list">
      <h2>Your Items</h2>
      <div v-if="items.length === 0">No items yet.</div>
      <ul>
        <li v-for="item in items" :key="item.id">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <button @click="startEdit(item)">Edit</button>
          <button @click="remove(item.id)">Delete</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getItems, createItem, updateItem, deleteItem } from '../api';

const router = useRouter();
const items = ref([]);
const form = ref({ title: '', description: '' });
const editingId = ref(null);

const load = async () => {
  items.value = await getItems();
};

onMounted(load);

const saveItem = async () => {
  if (editingId.value) {
    await updateItem(editingId.value, form.value);
  } else {
    await createItem(form.value);
  }
  form.value = { title: '', description: '' };
  editingId.value = null;
  await load();
};

const startEdit = (item) => {
  editingId.value = item.id;
  form.value = { title: item.title, description: item.description };
};

const cancelEdit = () => {
  editingId.value = null;
  form.value = { title: '', description: '' };
};

const remove = async (id) => {
  await deleteItem(id);
  await load();
};

const logout = () => {
  localStorage.removeItem('token');
  router.push({ name: 'login' });
};
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 2rem auto;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list ul {
  list-style: none;
  padding: 0;
}
.list li {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
