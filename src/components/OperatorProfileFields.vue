<template>
    <div id="OperatorNew">
        <div class="header">
            <div class="header-text">{{ login }}</div>
        </div>
        <div class="header-text popup"
        >
            error text
        </div>

        <div class="body">
            <div class="body-col">
                <div class="col">
                    <div class="label">Имя:</div>
                    <div class="input">
                        <input v-model="$v.localFirstName.$model" class="input-field" type="text"/>
                    </div>
                    <div :class="{'active': $v.localFirstName.$error}" class="error-text">Введите имя</div>
                </div>
                <div class="col">
                    <div class="label">Фамилия:</div>
                    <div class="input">
                        <input v-model="$v.localLastName.$model" class="input-field" type="text"/>
                    </div>
                    <div :class="{'active': $v.localLastName.$error}" class="error-text">Введите фамилию</div>
                </div>
                <div class="col">
                    <div class="label">Email:</div>
                    <div class="input">
                        <input v-model="$v.localEmail.$model" class="input-field" type="email"/>
                    </div>
                    <div :class="{'active': $v.localEmail.$error}"  class="error-text">Введите коректный email</div>
                </div>
                <div class="col">
                    <div class="label">Телефон:</div>
                    <div class="input">
                        <input v-model="$v.localPhone.$model" class="input-field" type="tel"  v-mask="'+7-###-###-##-##'" />
                    </div>
                    <div :class="{'active': $v.localPhone.$error}" class="error-text">Введите коректный телефон</div>
                </div>
            </div>
            <div class="body-col" v-if="avatarImageUrl === null">
                <form
                    :class="{active: dropAreaActive}"
                    @dragover.prevent="dropAreaActive = true"
                    @dragleave="dropAreaActive = false"
                    class="drag-box" aria-dropeffect="move"
                    @drop.prevent="onDropImage">
                    <input
                            type="file"
                            accept="image/*"
                            style="display: none"
                            id="selectFile"
                            ref="fileInput"
                            v-on:change="uploadFile"
                    >
                    <div  style="width: 130px" class="button">Добавить фото</div>
                    <div class="text">или перетащите фото сюда</div>
                </form>
            </div>
            <div class="body-col body-col-img" v-else>
                <div class="clean" @click="avatarImageUrl = null">Удалить</div>
                <img :src="avatarImageUrl" alt="" style="margin: 0 auto;border-radius: 50%; width: 180px; height: 180px; object-fit: cover">
            </div>
            <div class="body-col body-col-img" v-else>
                <div class="clean">Удалить</div>
                <img alt="" style="margin: 0 auto;border-radius: 50%; width: 180px; height: 180px; object-fit: cover">
            </div>

        </div>
        <div class="body">
            <div class="body-col" style="padding: 0">
                <div class="col">
                    <div class="label">Новый пароль:</div>
                    <div class="input">
                        <input v-model.trim="$v.password.$model" class="input-field" type="password"/>
                    </div>
                    <div :class="{'active': $v.password.$error}" class="error-text">Мин длинна символов: 6</div>
                </div>
                <div class="col" />
            </div>
            <!--        <div class="button" @click="submitButton" :class="isFormValid? '' : 'disabled'">Сохранить</div>-->
            <div class="button" @click="onSubmitButtonClick" :class="isFormValid? '' : 'disabled'">Сохранить</div>
        </div>
    </div>
</template>

<script>
    import apiRequest from '../utils/apiRequest';
    import { required, email, minLength } from 'vuelidate/lib/validators'
    export default {
      props: {
        login: {
          type: String,
          required: true
        },
        firstName: {
          type: String,
          required: true
        },
        lastName: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        phone: {
          type: String,
          required: true
        }
      },
      data() {
        return {
          localEmail: this.email,
          localLastName: this.lastName,
          localFirstName: this.firstName,
          localPhone: this.phone,
          dropAreaActive: false,
          avatarImageUrl: null,
          avatarImagePicture: null,
          password: '',
          isFormValid: true,
        }
      },
      methods: {
        async onSubmitButtonClick() {
          ['localEmail', 'localPhone', 'localFirstName', 'localLastName'].forEach(field => {
            this.$v[field].$touch()
          })

          if (this.$v.$anyError ) return
          const loader = this.$loading.show()
          try {
            const payload = {
              firstName: this.localFirstName,
              phone: this.localPhone,
              email: this.localEmail,
              lastName: this.localLastName,
              photo: this.avatarImagePicture
            }
            if (this.password !== '') await apiRequest.post('api/users/set-password', {login: this.login, password: this.password})
            let resp = await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}`, payload)

            console.warn(resp)
            const {email, firstName, lastName, phone } = resp.data
            this.$store.commit('updateUserData', {email, firstName, lastName, phone})

            if (resp.status === 200) {
              loader.hide()
              this.$router.back()
            }
          } catch (e) {
            this.error = Object.values(e.response.data.errors)[0]
            this.errorShow = true
          }
        },
        uploadFile() {

        },
        onDropImage(e) {
          console.log(e)
          let droppedFiles = e.dataTransfer.files;
          if(!droppedFiles) return;
          // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
          ([...droppedFiles]).forEach(f => {
            this.avatarImagePicture = f
          });
          this.avatarImageUrl = URL.createObjectURL(this.avatarImagePicture);
          this.dropAreaActive = false
        },

      },
      validations: {
        localFirstName: {
          required,
        },
        localLastName: {
          required
        },
        localEmail: {
          required,
          email
        },
        localPhone: {
          required
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
</script>