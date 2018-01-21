<script>
    // CommitChart.js
    import { Doughnut, mixins } from 'vue-chartjs'

    export default {
        extends: Doughnut,
        props: ['data', 'options'],
        mounted () {
            this.renderChart(this.data, this.options)
        },
        methods: {
            update() {
                this.$data._chart.update()
            }
        }
    }
</script>