<template>
    <div class="block-input-period">
                <span
                    class="block-input-period__placeholder"
                    v-if="!showPlaceholder"
                >
                    {{ placeholder }}
                </span>
        <VueCtkDateTimePicker
            @is-shown="show"
            @is-hidden="$emit('hidden')"
            class="block-input-period__period"
            v-model="periodVal"
            formatted="DD.MM.YYYY"
            format="YYYY-MM-DD"
            color="#6749E8"
            locale="ru"
            overlay
            :custom-shortcuts="customShortcuts"
            only-date
            no-label
            range
        />
    </div>
</template>

<script>
    export default {
        props: {
            showPlaceholder: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: 'Период'
            }
        },
        data() {
            return {
                periodVal: '',
                customShortcuts: [
                    {key: 'today', label: 'Сегодня', value: 'day'},
                    {key: 'yesterday', label: 'Вчера', value: '-day'},
                    {key: 'thisWeek', label: 'Эта неделя', value: 'isoWeek'},
                    {key: 'lastWeek', label: 'Прошлая неделя', value: '-isoWeek'},
                    {key: 'thisMonth', label: 'Этот месяц', value: 'month'},
                    {key: 'lastMonth', label: 'Прошлый месяц', value: '-month'},
                    {key: 'thisYear', label: 'Этот год', value: 'year'},
                    {key: 'lastYear', label: 'Прошлый год', value: '-year'}
                ]
            }
        },
        methods: {
            show() {
                this.$emit('show')
                    let btn = document.querySelector('.block-input-period .datepicker-button.validate')
                    btn.innerHTML = 'Сохранить'
            }
        },
        watch: {
            periodVal: {
                handler(val) {
                    this.$emit('input', val)
                },
                deep: true
            }
        },
        mounted() {
            let btn = document.querySelector('.datepicker-button.validate')
            btn.textContent = 'Сохранить'
        }
    }
</script>

<style lang="scss" scoped>
    .block-input-period {
        position: relative;
        &__placeholder {
            font-size: 13px;
            margin-left: auto;
            margin-right: 5px;
            position: absolute;
            top: 50%;
            transform: translateY(-57%);
            left: 15px;
        }
    }
   .block-input-period .block-input-period__period {
       /deep/ .datetimepicker {
           width: 460px !important;
           min-height: 430px;
           position: fixed !important;
           top: 50% !important;
           left: 50% !important;
           transform: translate(-50%, -50%) !important;

           & * {
               font-family: $family--default !important;
           }
       }
       /deep/ .date-time-picker .time-picker-overlay {
           background-color: transparent;
       }

       /deep/ .datepicker {
           top: 0 !important;
           width: 100% !important;
           max-width: 100% !important;
           min-height: 430px;
           border-radius: 8px !important;
       }

       /deep/ .header-picker {
           background-color: $color--primary !important;
       }

       /deep/ .field-input {
           font-family: $family--default;
           color: $color--text;
           min-height: 40px;
           height: 27px;
           background-color: transparent;
           border-radius: 8px;
           border: 1px solid #DCDCDC;

           &::placeholder {
               color: transparent;
           }
       }

       /deep/ .datepicker-container .datepicker-days .datepicker-day .datepicker-today {
           border-radius: 50% !important;
       }

       /deep/ .datepicker-day-text {
           font-family: $family--default !important;
       }

       /deep/ .datepicker-day {
           &-effect {
               background-color: $color--primary !important;
               border-radius: 50% !important;
           }

           &.selected {
               .datepicker-day-effect {
                   border-radius: 0 !important;
                   background-color: $color--primary !important;
               }

               &.first {
                   .datepicker-day-effect {
                       border-top-left-radius: 20px !important;
                       border-bottom-left-radius: 20px !important;
                       background-color: $color--primary !important;
                   }
               }

               &.last {
                   .datepicker-day-effect {
                       border-top-right-radius: 20px !important;
                       border-bottom-right-radius: 20px !important;
                       background-color: $color--primary !important;
                   }
               }
           }

           &.between {
               .datepicker-day-effect {
                   border-radius: 0 !important;
                   background-color: $color--primary !important;
               }
           }

       }

       /deep/ .datepicker-container .datepicker-days .datepicker-day {
           font-size: 14px;
       }

       /deep/ .shortcuts-container {
           width: 170px !important;
           height: 330px !important;
           max-width: 170px !important;
           min-width: 170px !important;

           .custom-button {
               padding: 0 5px;
               border: 0 !important;
               justify-content: flex-start !important;

               &:hover {
                   .custom-button-effect {
                       opacity: 1;
                       background-color: rgba($color--primary, 1) !important;
                   }
               }

               .custom-button-content {
                   transition-duration: 0.3s;
                   color: darken($color--primary, 30%);
               }

               .custom-button-effect {
                   border-radius: 8px;
                   transform: scale(1) !important;
                   opacity: 0;
                   transition-duration: 0.3s;
               }

               &:last-of-type {
                   margin-bottom: 0 !important;
               }

               & * {
                   font-size: 12px !important;
               }

               &.is-selected {
                   .custom-button-content {
                       color: $color--text-invert !important;
                       transition-duration: 0.3s;
                   }

                   .custom-button-effect {
                       opacity: 1;
                       background-color: rgba($color--primary, 1) !important;
                   }
               }
           }
       }

       /deep/ .datepicker-container-label {
           .custom-button {
               border: 0 !important;


               &:hover {
                   .custom-button-effect {
                       opacity: 1;
                       background-color: rgba($color--primary, 1) !important;
                   }
               }

               .custom-button-content {
                   transition-duration: 0.3s;
               }

               .custom-button-effect {
                   transform: scale(1) !important;
                   opacity: 0;
                   transition-duration: 0.3s;
                   border-radius: 8px !important;
               }

               &:last-of-type {
                   margin-bottom: 0 !important;
               }

               & * {
               }

               &.is-selected {
                   .custom-button-content {
                       color: $color--text-invert !important;
                       transition-duration: 0.3s;
                   }

                   .custom-button-effect {
                       opacity: 1;
                       background-color: rgba($color--primary, 1) !important;
                   }
               }
           }
       }


       /deep/ .shortcuts-container button.shortcut-button:last-of-type {
           margin-bottom: 0 !important;
       }

       /deep/ .shortcuts-container {
           width: 160px;
           max-width: 160px;
           min-width: 158px;
       }

       /deep/ .custom-button-content {
           /*margin-top: 3px;*/
       }


       /deep/ .field-clear-button {
           width: 18px !important;
           height: 18px !important;
           right: 6px;
           background-color: transparent;

           .custom-button-effect {
               display: none !important;
           }

           .custom-button-content {
               color: $color--text !important;
           }

           &:hover {
               .custom-button-effect {
                   opacity: 0;
               }

               .custom-button-content {
                   color: $color--primary !important;
               }
           }
       }

       /deep/ .field-input {
           padding-right: 16px !important;
       }

       /deep/ .datepicker-day.first.last {
           .datepicker-day-effect {
               width: 30px !important;
               max-width: 30px !important;
           }
       }

       /deep/ .datepicker-container-label {
           button {
               width: 105px;
           }
       }
       /deep/ .datepicker-button.validate {
           color: $color--text-invert !important;
           background-color: $color--primary !important;
           border-radius: 8px !important;
           font-size: 12px !important;
           transition-duration: 0.3s !important;
           border: 0 !important;

           &:hover {
               opacity: 0.8;
           }
       }
   }
</style>
