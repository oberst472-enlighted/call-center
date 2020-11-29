<template>
    <div class="ui-drag" :class="classes">
        <div class="ui-drag__content">
            <div
                class="ui-drag__drop-area"
                @dragenter="dragEnt"
                @dragleave="dragLeave"
                @dragover="dragOver"
                @drop="dropFile"
            >
                <input id="file" type="file" multiple accept="image/*" class="ui-drag__input" @change="handleFiles($event.target.files)">
                <label for="file" class="ui-drag__label">Добавить файл</label>
                <span class="md-hide">Или перетащить в область</span>
            </div>
        </div>
        <div id="gallery" class="ui-drag__gallery">
            <div class="ui-drag__gallery-item" v-for="item in galleryPreviews"
                 :key="item.id">
                <div class="ui-drag__gallery-img-box">
                    <img
                        class="ui-drag__gallery-img"
                        :src="item.file"
                        alt="image"
                    >
                </div>
                <button class="ui-drag__gallery-delete" @click="deleteFile(item)">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        props: {
          defaultValue: {
              type: Array,
              default: () => []
          }
        },
        data() {
            return {
                isActive: false,
                galleryPreviews: []
            }
        },
        computed: {
            ...mapState('resize', ['isMediaMD']),
            classes() {
                return {
                    ['ui-drag--active']: this.isActive
                }
            }
        },
        methods: {
            ...mapActions('media', ['stDownloadMedia']),
            dragEnt(e) {
                e.preventDefault()
                this.isActive = true
            },
            dragLeave(e) {
                e.preventDefault()
                this.isActive = false
            },
            dragOver(e) {
                e.preventDefault()
                this.isActive = true
            },
            dropFile(e) {
                e.preventDefault()
                this.isActive = false
                let dt = e.dataTransfer
                let files = dt.files
                this.handleFiles(files)

            },
            handleFiles(files) {
                const arrFiles = [...files]
                arrFiles.forEach(this.uploadFile)
                // arrFiles.forEach(this.previewFile)
            },
             uploadFile(file) {
                let formData = new FormData()
                formData.append('file', file)
                 console.log(formData)
                // const response = await this.stDownloadMedia(formData)
                 this.$emit('input', formData)
            },
             deleteFile(val) {
                const index = this.galleryPreviews.findIndex(item => item.id === val.id)
                this.galleryPreviews.splice(index, 1)
            }
            // previewFile(file) {
                // let reader = new FileReader()
                // reader.readAsDataURL(file)
                // reader.onloadend = () => {
                //     this.galleryPreviews.push(reader.result)
                // }
            // }
        },
        watch: {
            // galleryPreviews(val) {
            //         let arr = val.map(item => item.id)
            //         this.$emit('input', arr)
            // }
        },
        mounted() {
            if (this.defaultValue.length) {
                this.galleryPreviews = this.defaultValue
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-drag {
        width: 100%;

        &__content {
            width: inherit;
            height: 100%;
        }

        &__drop-area {
            width: inherit;
            height: inherit;
            border: 1px dashed #DCDCDC;
            border-radius: 8px;
            background-color: #FDFDFF;
            font-size: 13px;
            color: $color--text;
            display: flex;
            align-items: center;
            justify-content: center;
            transition-duration: 0.3s;
        }

        &__input {
            display: none;
        }

        &__label {
            background-color: $color--primary;
            padding: 0 12px;
            height: 33px;
            border-radius: 8px;
            font-size: 12px;
            color: $color--text-invert;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-right: 15px;
            transition: background-color 0.3s ease;
            user-select: none;

            &:hover {
                background-color: #765BEA;
            }

            &:active {
                transition-duration: 0s;
                background-color: #6147D8;
            }
        }

        &--active {
            .ui-drag__drop-area {
                border-color: $color--positive;
                background-color: rgba(85, 255, 142, 0.04);
            }
        }

        &__gallery {
            margin-top: 16px;
            margin-left: -4px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            &-item {
                margin-top: 4px;
                display: inline-flex;
                flex-direction: column;
                margin-left: 4px;
                position: relative;
            }

            &-img-box {
                width: 72px;
                height: 72px;
                border-radius: 7px;
                z-index: 2;
                position: relative;
                overflow-x: hidden;
                background-color: #dedede;
            }

            &-img {
                width: 100%;
                height: 100%;
                max-width: 100%;
               position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                object-fit: cover;
            }

            &-delete {
                font-size: 12px;
                color: $color--primary;
                border: 0;
                background-color: transparent;
                line-height: 24px;
                cursor: pointer;
                transition: color 0.3s ease;

                &:hover {
                    color: $color--positive;
                }

                &:active {
                    opacity: 0.7;
                }

            }
        }
    }
</style>
