<template>
    <div
        :class="{'block-download--image': image}"
        class="block-download"
    >
        <div class="block-download__title">
            <slot/>
        </div>

        <div class="block-download__box">
            <button
                v-if="image"
                class="block-download__delete-btn"
                title="Удалить изображение"
                @click="_deleteImg"
            >
                <IconRubbishBin class="block-download__delete-icon"/>
            </button>

            <div class="block-download__inp">
                <span class="block-download__placeholder">Кликните по области <br> или перетащите файл</span>
                <input
                    class="block-download__input"
                    type="file"
                    @change="onFileSelect"
                >
                <img
                    v-if="image"
                    :src="image"
                    alt="Аватар"
                    class="block-download__preview"
                >
            </div>

            <div
                v-show="selectedFile"
                class="block-download__popup"
                title="Закрыть"
                @click.self="_reset"
            >
                <div class="block-download__popup-cropper">
                    <VueCropper
                        ref="cropper"
                        :src="selectedFile"
                    />

                    <UiBtn
                        :loading="isLoading"
                        class="block-download__save-btn"
                        theme="positive"
                        @click="saveImage()"
                    >
                        Сохранить
                    </UiBtn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {token} from '@/api/token'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import axios from 'axios'

export default {
    components: {VueCropper},
    data() {
        return {
            mime_type: '',
            cropedImage: '',
            autoCrop: false,
            selectedFile: '',
            image: '',
            dialog: false,
            files: '',
            isLoading: false
        }
    },
    methods: {
        saveImage() {
            this.isLoading = true
            this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
            this.$refs.cropper.getCroppedCanvas().toBlob(async blob => {
                const formData = new FormData()
                formData.append('file', blob, `${Date.now()}-img.jpg`)
                const isSuccess = await this._downloadFile(formData)
                if (isSuccess) {
                    this._insertTheResultingImage(isSuccess)
                }
            }, this.mime_type)
        },
        onFileSelect(e) {
            const file = e.target.files[0]
            if (!file) return
            this.mime_type = file.type
            if (typeof FileReader === 'function') {
                const reader = new FileReader()
                reader.onload = event => {
                    this.selectedFile = event.target.result
                    this.$refs.cropper.replace(this.selectedFile)
                }
                reader.readAsDataURL(file)
            } else {
                alert('Ваш браузер не поддерживает FileReaderApi')
            }
        },
        async _downloadFile(formData) {
            try {
                const isSuccess = await axios({
                    method: 'POST',
                    url: `/api/v1/media/`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `JWT ${this.tokenUrl}`
                    },
                    data: formData
                })
                if (isSuccess.status === 201) {
                    return isSuccess.data
                } else {
                    this.isLoading = false
                    return false
                }
            } catch (e) {
                console.log(e)
                this.isLoading = false
                return false
            }
        },
        _insertTheResultingImage(payload) {
            this.image = payload.file
            this.$emit('change', payload.id)
            this.isLoading = false
            this.selectedFile = ''
        },
        _deleteImg() {
            this._reset()
            this.image = ''
            this.$emit('change', '')
        },
        _reset() {
            this.mime_type = ''
            this.cropedImage = ''
            this.autoCrop = false
            this.selectedFile = ''
            this.dialog = false
            this.files = ''
            this.isLoading = false
        },
    },
    mounted() {
        this.tokenUrl = token()
    }
}
</script>

<style lang="scss" scoped>
.block-download {
    &__title {
        display: block;
        margin-bottom: 4px;
        font-size: 13px;
        line-height: 1;
        color: #000000;
        font-weight: 500;
        user-select: none;
    }

    &__box {
        position: relative;

        &:hover {
            .block-download__delete-btn {
                opacity: 0.5;
                pointer-events: auto;
            }
        }
    }

    &__delete-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 40px;
        height: 40px;
        padding: 10px;
        color: #ffffff;
        opacity: 0;
        border: none;
        border-radius: 50%;
        outline: 0;
        background-color: $color--negative;
        cursor: pointer;
        transition-duration: 0.3s;
        transform: translate(-50%, -50%);
        pointer-events: none;

        &:hover {
            opacity: 1 !important;
            background-color: darken($color--negative, 15%);
        }

        &:active {
            opacity: 0.8;
        }
    }

    &__inp {
        position: relative;
        z-index: 1;
        width: 200px;
        height: 200px;
        border: 1px dashed #DCDCDC;
        border-radius: 8px;
        background-color: #FDFDFF;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            background-color: rgba(85, 255, 142, 0.04);
        }

        input {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    &__placeholder {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 100%;
        padding: 15px;
        font-size: 13px;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    &__input {
        z-index: 2;
        cursor: pointer;
    }

    &__preview {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__popup {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(#000, 0.3);
        cursor: pointer;

        &-cropper {
            position: relative;
            max-width: 50%;
            border-radius: 9px;
            overflow: hidden;

        }

    }


    &__save-btn {
        position: absolute !important;
        right: 10px;
        bottom: 10px;
    }

    &--image {
        .block-download__inp {
            border-color: transparent;
        }

        .block-download__delete-btn {
            display: inline-flex;
        }
    }

}

.block-download__save {
    position: absolute !important;
    right: 10px;
    bottom: 10px;
}
</style>
