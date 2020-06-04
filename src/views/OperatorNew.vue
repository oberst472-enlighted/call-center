<template>
  <div id="OperatorNew">
    <div class="header">
      <div class="header-text">Добавление оператора</div>
    </div>
    <div class="body">
      <div class="body-col">
        <div class="col">
          <div class="label">Имя:</div>
          <div class="input">
            <input class="input-field" type="text" v-model="newUser.firstName"/>
          </div>
        </div>
        <div class="col">
          <div class="label">Фамилия:</div>
          <div class="input">
            <input class="input-field" type="text" v-model="newUser.lastName"/>
          </div>
        </div>
        <div class="col">
          <div class="label">Email:</div>
          <div class="input">
            <input class="input-field" type="email" v-model="newUser.email"/>
          </div>
        </div>
        <div class="col">
          <div class="label">Телефон:</div>
          <div class="input">
            <input class="input-field" type="tel" v-model="newUser.phone"/>
          </div>
        </div>
      </div>
      <div class="body-col">
        <div class="drag-box" :class="{active: isActive}" aria-dropeffect="move" @drop.prevent="addFile" @dragover.prevent="isActive = true" @dragleave="isActive = false">
          <input type="file" style="display: none" id="selectFile" accept="image/*">
          <div  style="width: 130px" class="button" @click="clickOnUpload">Добавить фото</div>
          <div class="text">или перетащите фото сюда</div>
        </div>
      </div>
    </div>
    <div class="body" style="padding: 0">
      <div class="body-col" style="padding: 0">
        <div class="col">
          <div class="label">Язык:</div>
          <div class="input radio">
            <span class="checkmark" @click="newUser.language = 'ru'" :class="{active: newUser.language === 'ru'}"></span>
            <div @click="newUser.language = 'ru'">Русский</div>
            <span class="checkmark" @click="newUser.language = 'en'" :class="{active: newUser.language === 'en'}"></span>
            <div @click="newUser.language = 'en'">English</div>
          </div>
        </div>
        <div class="col" />
        <div class="col">
          <div class="label">Пароль:</div>
          <div class="input" v-model="newUser.password">
            <input class="input-field" type="password" v-model="newUser.password"/>
          </div>
        </div>
        <div class="col" />
      </div>
    </div>
    <div class="button" @click="submitButton">Сохранить</div>
  </div>
</template>

<script>
  export default {
    name: "OperatorNew",
    data() {
      return {
        newUser: {
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
          language: null,
          password: null,
          file: null
        },
        isActive: false
      }
    },
    methods: {
      submitButton(){
        console.log(this.newUser)
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
        this.isActive =false
      },
    },
    components: {},
    props: {}
  }
</script>

<style lang='scss'>
#OperatorNew {
  width: 100%;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
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
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    line-height: 19px;
    .body-col{
      width: 50%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
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
        margin-bottom: 10px;
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
