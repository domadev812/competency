<template>
    <div>
        <v-text-field label="number" ref="input" :value="value"></v-text-field>
        <div class="green">{{ saved }}</div>
    </div>
</template>

<script>  
  import { fromEvent } from 'rxjs'
  import { map, debounceTime, tap } from 'rxjs/operators'
  const patt = /^[+-]?([0-9]*[.])?[0-9]+$/

  export default {
    props:['value'],
    data(){
        return {
            saved: ''
        }
    },
    mounted(){
        const possibleError = (val) => {
            if(patt.test(val)){
                this.$store.commit('setError', '')
            }else{
                this.$store.commit('setError', 'El valor debe ser numérico')
            }
        }
        
        const input = this.$refs.input
        const stream$ = fromEvent(input.$el, 'input').pipe(
            map(x => x.target.value),
            tap(x => possibleError(x)),
            debounceTime(2000)
        )
        
        stream$.subscribe(x => {
            if(patt.test(x)){
                x = parseFloat(x)
                this.saved = 'guardado!'
                setTimeout(() => {
                    this.saved = ''
                }, 2000)
            }
            this.$emit('input', x)
        })        
    }
  }
</script>

<style scoped>
    .green{
        color: green;
    }
</style>
