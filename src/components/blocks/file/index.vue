<template>
    <div :class="classes" class="ui-drag">
        <div class="ui-drag__content">
            <div
                :class="{'ui-drag__drop-area--hide': !galleryPreviews.file && isMediaMD}"
                class="ui-drag__drop-area"
                @dragenter="dragEnt"
                @dragleave="dragLeave"
                @dragover="dragOver"
                @drop="dropFile"
            >
                <input id="file" accept="image/*" class="ui-drag__input" type="file" @change="handleFiles($event.target.files)">
                Перетащите фото <br> в область
            </div>
            <label v-if="!galleryPreviews.file" class="ui-drag__label" for="file">Добавить фото</label>
            <button v-else class="ui-drag__label-delete" @click="deleteFile">Удалить фото</button>
            <div v-if="galleryPreviews.file" id="gallery" class="ui-drag__gallery">
                <img
                    :src="galleryPreviews.file"
                    alt="image"
                    class="ui-drag__gallery-img"
                >
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    model: {
        event: 'input'
    },
    props: {
        defaultValue: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            isActive: false,
            galleryPreviews: {
                id: '',
                file: ''
            }
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
        async uploadFile(file) {
            let formData = new FormData()
            formData.append('file', file)
            this.galleryPreviews = await this.stDownloadMedia(formData)
        },
        deleteFile() {
            this.galleryPreviews = {
                id: '',
                file: ''
            }
        }
    },
    watch: {
        galleryPreviews(val) {
            this.$emit('input', val)
        }
    },
    mounted() {
        if (this.defaultValue) {
            this.galleryPreviews = this.defaultValue
        }
    }
}
</script>

<style lang="scss" scoped>
.ui-drag {
    height: 140px;

    &__content {
        position: relative;
        display: flex;
        align-items: center;
        width: inherit;
    }

    &__drop-area {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        //width: inherit;
        height: 140px;
        width: 140px;
        font-size: 12px;
        color: $color--text;
        border: 1px dashed #DCDCDC;
        border-radius: 50%;
        background-color: #FDFDFF;
        transition-duration: 0.3s;
        text-align: center;

        &--hide {
            width: 0;
            height: 0;
            margin-right: 0;
            opacity: 0;
            overflow: hidden;
        }
    }

    &__input {
        display: none;
    }

    &__label,
    &__label-delete {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        height: 30px;
        margin-right: 15px;
        margin-left: 30px;
        padding: 0 12px;
        color: $color--text-invert;
        border-radius: 8px;
        background-color: $color--primary;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #765BEA;
        }

        &:active {
            background-color: #6147D8;
            transition-duration: 0s;
        }
    }

    &__label-delete {
        border: 0;
        background-color: $color--negative;

        &:hover {
            background-color: darken($color--negative, 10%);
        }

        &:active {
            background-color: darken($color--negative, 20%);
            transition-duration: 0s;
        }
    }

    &--active {
        .ui-drag__drop-area {
            border-color: $color--positive;
            background-color: rgba(85, 255, 142, 0.04);
        }
    }

    &__gallery {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;


        &-img {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &-delete {
            font-size: 12px;
            line-height: 24px;
            color: $color--primary;
            border: 0;
            background-color: transparent;
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
