<template>
  <div id="OperatorNew">
    <div class="header">
      <div class="header-text">Добавление оператора</div>
    </div>
    <div class="header-text popup"
         :class="error.length? 'active' : ''"
    >
      {{error}}
    </div>

    <div class="body">
      <div class="body-col">
        <div class="col">
          <div class="label">Имя:</div>
          <div class="input">
            <input class="input-field" type="text" v-model="newUser.firstName"/>
          </div>
          <div class="error-text" :class="isFirstNameValid? 'active' : ''">Введите имя</div>
        </div>
        <div class="col">
          <div class="label">Фамилия:</div>
          <div class="input">
            <input class="input-field" type="text" v-model="newUser.lastName"/>
          </div>
          <div class="error-text" :class="isLastNameValid? 'active' : ''">Введите фамилию</div>
        </div>
        <div class="col">
          <div class="label">Email:</div>
          <div class="input">
            <input class="input-field" type="email" v-model="newUser.email"/>
          </div>
          <div class="error-text" :class="isEmailValid? 'active' : ''">Введите коректный email</div>
        </div>
        <div class="col">
          <div class="label">Телефон:</div>
          <div class="input">
            <input class="input-field" type="tel" v-model="newUser.phone" v-mask="'+7-###-###-##-##'" />
          </div>
          <div class="error-text" :class="isPhoneValid? 'active' : ''">Введите коректный телефон</div>
        </div>
      </div>
      <div class="body-col" v-if="!url">
        <form class="drag-box" :class="{active: isActive}" aria-dropeffect="move" @drop.prevent="addFile" @dragover.prevent="isActive = true" @dragleave="isActive = false">
          <input
                  type="file"
                  accept="image/*"
                  style="display: none"
                  id="selectFile"
                  ref="fileInput"
                  v-on:change="uploadFile"
          >
          <div  style="width: 130px" class="button" @click="clickOnUpload">Добавить фото</div>
          <div class="text">или перетащите фото сюда</div>
        </form>
      </div>
      <div class="body-col body-col-img" v-else>
        <div class="clean" @click="cleanImg">Удалить</div>
        <img :src="url" alt="" style="margin: 0 auto;border-radius: 50%; width: 180px; height: 180px; object-fit: cover">
      </div>

    </div>
    <div class="body" style="padding: 0">
      <div class="body-col" style="padding: 0">
        <div class="col">
          <div class="label">Язык:</div>
          <div class="input radio" v-if="languages" style="margin-bottom: 5px">
            <template v-for="language in languages">
              <span  :key="language.title"
                     class="checkmark"
                     :class="{active: newUser.languages.includes(language)}"
                     @click="toggleLanguage(language)"
              />
              <div @click="toggleLanguage(language)">{{language.title}}</div>
            </template>
          </div>
          <div class="error-text" :class="isLanguageValid? 'active' : ''">Выберете хотя бы 1 язык</div>
        </div>
        <div class="col" />
        <div class="col">
          <div class="label">Username:</div>
          <div class="input" v-model="newUser.username">
            <input class="input-field" type="text" v-model="newUser.username"/>
          </div>
          <div class="error-text" :class="isUsernameValid? 'active' : ''">Введите username</div>
        </div>
        <div class="col">
          <div class="label">Пароль:</div>
          <div class="input" v-model="newUser.password">
            <input class="input-field" type="password" v-model="newUser.password"/>
          </div>
          <div class="error-text" :class="isPasswordValidMin || isPasswordValidMax? 'active' : ''">{{passwordError}}</div>
        </div>
        <div class="col" />
      </div>
    </div>
    <div class="button" @click="submitButton" :class="isFormValid? '' : 'disabled'">Сохранить</div>
  </div>
</template>

<script>
  import apiRequest from "../utils/apiRequest";

  export default {
    name: "OperatorNew",
    data() {
      return {
        languages: null,
        newUser: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          languages: [],
          password: '',
          username: '',
          file: null,
        },
        url: null,
        error: 'Данное имя пользователя уже занято',
        isActive: false
      }
    },

    metaInfo() {
      return {
        title: `Добавить оператора - Колл-центр ${localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')}`
      }
    },
    computed: {
      isUsernameValid() {
        return (this.newUser.username.length === 0)
      },
      isFirstNameValid() {
        return (this.newUser.firstName.length === 0)
      },
      isLastNameValid() {
        return (this.newUser.lastName.length === 0)
      },
      isEmailValid() {
        return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.newUser.email)
      },
      isPhoneValid() {
        return !(this.newUser.phone.length === 16)
      },
      isLanguageValid() {
        return !this.newUser.languages.length
      },
      isPasswordValidMin() {
        return !(this.newUser.password.length >2)
      },
      isPasswordValidMax() {
        return !(this.newUser.password.length <17)
      },
      passwordError() {
        if (this.isPasswordValidMin) {
          return 'Мин. длина 8 символов'
        } else if (this.isPasswordValidMax) {
          return 'Макс. длина 16 символов'
        } else {
          return '3'
        }
      },
      isFormValid() {
        return !(
            this.isUsernameValid ||
            this.isFirstNameValid ||
            this.isLastNameValid ||
            this.isEmailValid ||
            this.isPhoneValid ||
            this.isLanguageValid ||
            this.isPasswordValidMin ||
            this.isPasswordValidMax
        )
      }
    },
    watch: {
      error(val){
        if (val.length) {
          setTimeout(()=> {
            this.error = ''
          }, 3000)
        }
      }
    },
    methods: {
      cleanImg(){
        this.newUser.file = null
        this.url = ''
      },
      toggleLanguage(val) {
        if (this.newUser.languages.includes(val)) {
          let id = this.newUser.languages.findIndex((i) => i === val)
          this.newUser.languages.splice(id, 1)
        } else {
          this.newUser.languages.push(val)
        }
      },
      async submitButton(){
        if (this.error.length) {
          this.error = ''
        } else {
          this.error = 'Данное имя пользователя уже занято'
        }
        // if (!this.isFormValid) { return }
        // try {
        //   let formData = new FormData();
        //   this.newUser.languages.forEach(i => {
        //     formData.append("langs", i._id);
        //   })
        //   formData.append("username", this.newUser.username);
        //   formData.append("firstName", this.newUser.firstName);
        //   formData.append("lastName", this.newUser.lastName);
        //   formData.append("email", this.newUser.email);
        //   formData.append("phone", this.newUser.phone);
        //   formData.append("password", this.newUser.password);
        //   formData.append("photo", this.newUser.file);
        //   formData.append("callCenterId", 'dev');
        //   formData.append("number", '0');
        //
        //   let resp = await apiRequest.post('/api/users', formData)
        //
        //   // let resp = await apiRequest.post('/api/users', {
        //   //   username: this.newUser.lastName,
        //   //   password: this.newUser.password,
        //   //   callCenterId: 'dev',
        //   //   number: 0,
        //   //   firstName: this.newUser.firstName,
        //   //   phone: this.newUser.phone,
        //   //   langs: this.newUser.languages.map(i => {
        //   //     return (i._id)
        //   //   }),
        //   //   email: this.newUser.email,
        //   //   photo: this.newUser.file
        //   // })
        //   console.log(resp)
        //   if (resp.status === 200) {
        //     this.$router.back()
        //   }
        // } catch (e) {
        //   this.error = Object.values(e.response.data.errors)[0]
        // }
      },
      uploadFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        this.newUser.file = files[0]
        this.url = URL.createObjectURL(this.newUser.file);
        this.isActive =false

      },
      clickOnUpload(){
        document.getElementById('selectFile').click();
      },
      addFile(e) {
        let droppedFiles = e.dataTransfer.files;
        if(!droppedFiles) return;
        // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
        ([...droppedFiles]).forEach(f => {
          this.newUser.file = f
        });
        this.url = URL.createObjectURL(this.newUser.file);
        this.isActive =false
      },
    },
    components: {},
    props: {},
    async created() {
      this.languages = (await apiRequest.get( '/api/langs/')).data
    }
  }
</script>

<style lang='scss'>
#OperatorNew {
  width: 100%;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
  .disabled{
    background-color: #888888 !important;
  }
  .popup{
    color: red !important;
    text-align: center;
    font-size: 15px !important;
    margin: auto;
    padding: 3px 15px;
    background-color: #f1eef5;
    border-radius: 8px;
    border: 1px solid #685c7b;
    position: fixed;
    top: 70px;
    right: 60px;
    visibility: hidden;
    z-index: 99;
    transition: height ease 0.2s;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
  }
  .popup.active{
    background-color: #f1eef5;
    border-radius: 8px;
    border: 1px solid #685c7b;
    visibility: visible;
    opacity: 1;
    width: auto;
    height: 25px;
    transition: height ease 0.2s;
  }
  .header{
    display: flex;
    align-items: center;
    &-text{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
  }
  .body{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    line-height: 19px;
    .body-col{
      width: 50%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;
    }
    .clean{
      display: none;
    }
    .body-col:first-child{
      padding-right: 10px;
    }
    .body-col:last-child{
      padding-left: 10px;
    }
    .col{
      margin-right: 20px;
      width: calc(50% - 20px);
      .label{
        color: #343a41;
        font-size: 12px;
        font-weight: 500;
      }
      .input{
        display: flex;
        align-items: center;
        margin-top: 10px;
        &-field{
          width: 100%;
          height: 39px;
          border-radius: 8px;
          border: 1px solid #dddddd;
          outline: none;
          padding: 0 13px;
        }
      }
      .input.radio{
        display: flex;
        align-items: center;
        color: #4e545b;
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
        .checkmark {
          width: 18px;
          height: 18px;
          margin-right: 8px;
          border-radius: 50%;
          background-color: #f4f3f7;
        }
        .checkmark:hover {
          background-color: #ccc;
        }
        .checkmark.active{
          border: 1px solid #66538a;
          border: 4px solid #f4f3f7;
          background-color: #66538a;
        }
        div{
          margin-right: 10px;
        }
      }
    }
  }
  .body-col-img:hover .clean{
    cursor: pointer;
    width: 100px;
    height: 33px;
    color: white;
    position: absolute;
    top: calc(50% - 16px);
    left: calc(50% - 45px);
    background-color: red;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .body-col-img:hover .clean:hover{
    zoom: 1.05;
  }
  .error-text{
    color: red;
    margin-left: 10px;
    margin-bottom: 5px;
    opacity: 0;
  }
  .error-text.active{
    opacity: 1;
  }
  .button {
    width: 100px;
    height: 33px;
    margin-top: 30px;
    border-radius: 8px;
    background-color: #66538a;
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
    }
  }
  .drag-box{
    margin-top: 29px;
    width: 100%;
    min-height: 117px;
    border-radius: 8px;
    border: 1px dashed #685c7b;
    background-color: #f1eef5;
    padding: 0 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all ease 0.5s;
    .button{
      margin: 0;
    }
    .text{
      color: #685c7b;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .drag-box.active{
    border: 1px solid #685c7b;
    transform: scale(1.02);
  }
}
</style>
