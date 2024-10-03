<template>
  <div>
    <h1>
      <NuxtLink to="/login" event="" @click.native="logout">Logout</NuxtLink>
    </h1>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const user = useSupabaseUser();
const client = useSupabaseClient();

console.log(user.value?.email)

async function logout() {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.log(error.message);
  }
  finally {
    alert("Logged Out Successfully!");
  }
}
</script>

<style></style>