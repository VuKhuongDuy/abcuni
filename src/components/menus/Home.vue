<template>
    <div id="home">   
        {{exam}}    
    </div>    
</template>
<script>
export default {
    props: {
        exam: {
            type: String,
            default: "213"
        }
    }
}
</script>
<style scoped>
#home {
    min-height: 95%;
    height: 95%;
}
</style>
