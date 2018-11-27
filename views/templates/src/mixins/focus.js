export default function (ref) {
  return {
    methods: {
      focus() {
        console.log("in maxins")
        this.$refs[ref].focus()
      }
    }
  }
}
