<script>
    // CommitChart.js
    import { Doughnut, mixins } from 'vue-chartjs'

    export default {
        extends: Doughnut,
        props: ['data'],
        data() {
            return {
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            }
        },
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