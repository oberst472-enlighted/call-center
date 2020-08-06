<template>
    <div>
        <OperatorProfilefields
            v-if="userData"
            :login="userData.user.username"
            :firstName="userData.user.firstName"
            :lastName="userData.user.lastName"
            :email="userData.user.email"
            :phone="userData.user.phone"
        />
    </div>
</template>

<script>
  import OperatorProfilefields from '../components/OperatorProfileFields'
  export default {
    components: {
      OperatorProfilefields
    },
    computed: {
      userData() {
        return this.$store.state.userData
      }
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
            top: 10px;
            right: 10px;
            visibility: hidden;
            z-index: 99;
            height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all ease 0.7s;
        }
        .popup.active{
            background-color: #f1eef5;
            border-radius: 8px;
            border: 1px solid #685c7b;
            visibility: visible;
            opacity: 1;
            width: auto;
            height: 28px;
            transition: all ease 1.2s;
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
            margin-top: 30px;
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

