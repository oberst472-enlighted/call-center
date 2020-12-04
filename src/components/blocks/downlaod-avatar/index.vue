<template>
    <div class="block-download">
        <div class="block-download__title"><slot></slot></div>

        <div class="block-download__box">
            <div class="block-download__inp">
                <input ref="FileInput" type="file" class="block-download__input" @change="onFileSelect">
                <img class="block-download__preview" :src="image" alt="" v-if="image">
            </div>

            <div v-show="selectedFile" class="block-download__popup">
                <div class="block-download__popup-cropper">
                    <VueCropper
                        ref="cropper"
                        :src="selectedFile"
                        alt="Source Image"/>
                    <UiBtn class="block-download__save-btn" theme="positive" @click="saveImage()" :loading="isLoading">Сохранить</UiBtn>
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
                formData.append('file', blob, 'name.jpeg')
                const isSuccess = await this._downloadFile(formData)
                console.log(isSuccess)
                if (isSuccess) {
                    this._insertTheResultingImage(isSuccess)
                }
            }, this.mime_type)
        },
        onFileSelect(e) {
            const file = e.target.files[0]
            this.mime_type = file.type
            console.log(this.mime_type)
            if (typeof FileReader === 'function') {
                const reader = new FileReader()
                reader.onload = event => {
                    this.selectedFile = event.target.result
                    this.$refs.cropper.replace(this.selectedFile)
                }
                reader.readAsDataURL(file)
            } else {
                alert('Sorry, FileReader API not supported')
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
                    // onUploadProgress: uploadedEvent => {
                    //     // store.commit('webrtc/webrtcCalls/SET_IS_PROGRESS_DOWNLOAD_VIDEO', Math.round(uploadedEvent.loaded / uploadedEvent.total * 100))
                    // },
                    data: formData
                })
                if (isSuccess.status === 201) {
                    console.log(2)
                    console.log(isSuccess.data)
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
            console.log(payload)
            console.log(payload.file)
            this.image = payload.file
            this.$emit('change', payload.id)
            console.log(payload.id)
            this.isLoading = false
            this.selectedFile = ''
        }
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
        user-select: none;
        font-weight: 500;
    }
    &__inp {
        width: 200px;
        height: 200px;
        border: 1px dashed #DCDCDC;
        border-radius: 8px;
        background-color: #FDFDFF;
        overflow: hidden;
        position: relative;

        input {
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: red;
            z-index: 2;
            position: relative;
        }
    }

    &__input {
        z-index: 2;
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

        &-cropper {
            position: relative;
            max-width: 50%;
            border-radius: 9px;
            overflow: hidden;

        }

    }
&__preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
    &__save-btn {
        position: absolute !important;
        right: 10px;
        bottom: 10px;
    }

}

.block-download__save {
    position: absolute !important;
    right: 10px;
    bottom: 10px;
}
</style>
