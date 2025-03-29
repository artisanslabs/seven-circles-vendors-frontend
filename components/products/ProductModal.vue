<template>
  <v-dialog v-model="showModal" max-width="960" persistent>
    <v-card class="text-center px-8 py-4 modal-card">
      <div class="flex-between">
        <h2 class="text-start fs-20 title-color">
          <!-- {{ pageTitle }} -->
          تفاصيل المنتج
        </h2>
        <v-btn icon dark class="close-dialog-icon" @click="showModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("v.name") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-text-field
                v-model="form.name"
                placeholder="أدخل اسم المنتج"
                type="text"
                :rules="[requiredRules, maxLength]"
                :counter="255"
                outlined
                dense
                required
              /> -->

              <p>{{ form.name }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الصنف الرئيسي</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-combobox
                v-model="form.category"
                placeholder="اختر الصنف الرئيسي"
                :items="categories"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
                @change="fetchSubcategories"
              /> -->
              <p>{{ form.category ? form.category.name : "" }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الصنف الفرعي</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-combobox
                v-model="form.subcategory"
                placeholder="اختر الصنف الفرعي"
                :items="subcategories"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
                :disabled="!form.category"
              /> -->
              <p>{{ form.subcategory ? form.subcategory.name : "" }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الوزن</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-text-field
                v-model="form.weight"
                placeholder="أدخل وزن المنتج"
                type="number"
                hide-spin-buttons
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              /> -->
              <p>{{ form.weight }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.unit") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-combobox
                v-model="form.unit"
                placeholder="اختر الوحدة"
                :items="units"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              /> -->
              <p>{{ form.unit ? form.unit.name : "" }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>سعر التكلفة</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-text-field
                v-model="form.price"
                hide-spin-buttons
                placeholder="أدخل سعر تكلفة المنتج"
                type="number"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              /> -->
              <p>{{ form.price }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>السعر المخفض</span>
              </div>
              <!-- <v-text-field
                v-model="form.sale_price"
                hide-spin-buttons
                placeholder="أدخل السعر المخفض"
                type="number"
                validate-on-blur
                outlined
                dense
              /> -->
              <p>{{ form.sale_price }}</p>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>تاريخ نهاية التخفيض</span>
              </div>
              <p>{{ form.sale_end }}</p>
              <!-- <v-menu
                v-model="sale_end"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.sale_end"
                    placeholder="أختر تاريخ نهاية التخفيض"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.sale_end"
                  locale="ar"
                  @input="sale_end = false"
                />
              </v-menu> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.production_date") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <p>{{ form.production_date }}</p>
              <!-- <v-menu
                v-model="production_date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.production_date"
                    placeholder="أختر تاريخ الانتاج"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.production_date"
                  locale="ar"
                  @input="production_date = false"
                />
              </v-menu> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.expiration_date") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <p>{{ form.expiration_date }}</p>
              <!-- <v-menu
                v-model="expiration_date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.expiration_date"
                    :disabled="!form.production_date"
                    placeholder="أختر تاريخ الانتهاء"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.expiration_date"
                  locale="ar"
                  :min="form.production_date"
                  @input="expiration_date = false"
                />
              </v-menu> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.qty") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <p>{{ form.quantity }}</p>
              <!-- <v-text-field
                v-model="form.quantity"
                placeholder="ادخل كمية المنتج"
                type="number"
                hide-spin-buttons
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              /> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>أقصى كمية لكل عميل</span>
              </div>
              <p>{{ form.notify_quantity }}</p>

              <!-- <v-text-field
                v-model="form.notify_quantity"
                placeholder="كم أقصى كمية لكل عميل"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
              /> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>رمز gtin</span>
              </div>
              <p>{{ form.gtin }}</p>

              <!-- <v-text-field
                v-model="form.gtin"
                placeholder="ادخل رمز gtin"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
                required
              /> -->
            </v-col>

            <v-col cols="12" sm="8">
              <div class="text-start mb-2">
                <span>رمز التخزين sku</span>
              </div>
              <p>{{ form.sku }}</p>

              <!-- <v-text-field
                v-model="form.sku"
                placeholder="ادخل رمز التخزين sku"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
                min="10"
                max="20"
              /> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.appear_status") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <v-radio-group v-model="form.status" row class="ms-n4">
                <v-radio
                  color="#0f6d39"
                  :label="$t('products.statuses.appear')"
                  :value="1"
                />
                <v-radio
                  color="#0f6d39"
                  :label="$t('products.statuses.hidden')"
                  :value="0"
                />
              </v-radio-group>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>هل يتطلب شحن / توصيل؟</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-radio-group v-model="form.requires_shipping" row class="ms-n4">
                <v-radio color="#0f6d39" :label="$t('btn.yes')" :value="1" />
                <v-radio color="#0f6d39" :label="$t('btn.no')" :value="0" />
              </v-radio-group>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>هل المنتج خاضع للضريبة؟</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-radio-group v-model="form.is_taxable" row class="ms-n4">
                <v-radio color="#0f6d39" :label="$t('btn.yes')" :value="1" />
                <v-radio color="#0f6d39" :label="$t('btn.no')" :value="0" />
              </v-radio-group>
            </v-col>

            <v-col cols="12">
              <div class="text-start mb-2">
                <span>{{ $t("products.main_image") }}</span>
                <!-- <span class="red-color">{{ $t("v.star") }}</span> -->
              </div>
              <!-- <v-file-input
                v-model="form.image"
                placeholder="صور المنتج"
                :rules="[requiredRules]"
                outlined
                dense
                append-icon="mdi-file-image"
              /> -->
              <v-card>
                <img
                  :src="imagePreview"
                  alt="Product Image"
                  v-if="imagePreview"
                  height="80"
                  class="grey darken-4"
                />
              </v-card>
            </v-col>

            <!-- <v-col cols="12" sm="2">
              <v-card>
                <img :src="imagePreview" alt="Product Image" v-if="imagePreview" height="80" class="grey darken-4" />
              </v-card>
            </v-col> -->

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>رابط مقطع فيديو</span>
              </div>
              <p>{{ form.video }}</p>

              <!-- <v-text-field
                v-model="form.video"
                placeholder="ادخل رابط مقطع الفيديو"
                type="text"
                outlined
                dense
              /> -->
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الماركة التجارية</span>
              </div>
              <p>{{ form.brand }}</p>
              <!-- <v-combobox
                v-model="form.brand"
                placeholder="اختر الماركة التجارية"
                :items="brands"
                item-text="name"
                item-value="id"
                outlined
                dense
                clearable
              /> -->
            </v-col>

            <v-col cols="12" sm="2">
              <div class="text-start mb-2">
                <span>لون المنتج</span>
              </div>
              <p>{{ form.colors }}</p>

              <!-- <v-row v-if="form.colors" class="my-2">
                <v-col
                  v-for="(color, index) in form.colors"
                  :key="index"
                  cols="auto"
                  class="my-2"
                >
                  <v-chip
                    close
                    @click:close="removeColor(index)"
                    :color="color.hex"
                    text-color="white"
                  >
                    {{ color.hex }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-color-picker
                v-model="newColor"
                multiple
                hide-inputs
                validate-on-blur
                outlined
                dense
                hide-canvas
                hide-sliders
                show-swatches
                style="max-width: 100% !important"
                @input="addColor"
              ></v-color-picker> -->
            </v-col>

            <v-col cols="12">
              <div class="text-start mb-2">
                <span>{{ $t("products.details") }}</span>
              </div>
              <p>{{ form.description }}</p>
              <!-- <v-textarea
                v-model="form.description"
                name="input-7-1"
                :rules="[max1500Length]"
                :counter="1500"
                placeholder="ادخل تفاصيل المنتج"
                outlined
                dense
              /> -->
            </v-col>

            <v-col cols="12" class="modal-btns mt-4 mb-6 d-flex justify-end">
              <!-- <v-btn :loading="loading" class="py-6 px-10 mx-2" @click="submit">
                {{ $t("btn.save") }}
              </v-btn> -->
              <v-btn class="py-6 px-10 cancel-btn" @click="showModal = false">
                {{ $t("btn.cancel") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import GlobalServices from "~/services/global.js";
export default {
  name: "ProductModal",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "add product",
    },
    product: {
      type: Object,
      default: () => {
        return {};
      },
    },
    units: {
      type: Array,
      default: () => {
        return [];
      },
    },
    categories: {
      type: Array,
      default: () => {
        return [];
      },
    },
    brands: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      imagePreview: null,
      medias: [],
      expiration_date: false,
      production_date: false,
      sale_end: false,
      showModal: false,
      clickedBtn: "cancel",
      loading: false,
      form: {
        colors: [],
      },
      oldForm: {},
      newColor: null,
      requiredRules: (v) => !!v || this.$t("v.field_required"),
      minLength: v => (v ? v.length >= 3 || this.$t('v.text_min_length') : ''),
      maxLength: v => (v ? v.length <= 255 || this.$t('v.text_max_length') : ''),
      max1500Length: v => (v ? v.length <= 1500 || this.$t('v.text_max_1500_length') : ''),
      min10Length: v => (v ? v.length >= 10 || this.$t('v.text_min_10_length') : ''),
      max20Length: v => (v ? v.length <= 20 || this.$t('v.text_max_20_length') : ''),
      min8Length: v => (v ? v.length >= 8 || this.$t('v.text_min_8_length') : ''),
      max14Length: v => (v ? v.length <= 14 || this.$t('v.text_max_14_length') : ''),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
    };
  },
  computed: {
    pageTitle() {
      return this.title === "add product" ? "إضافة منتج" : "تعديل منتج";
    },
    subcategories() {
      return this.$store.state.support.categoriesList;
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible === true) {
        this.showModal = true;
      }
    },
    showModal() {
      if (this.showModal === false) {
        this.$emit("closeModal", { value: true, clickedBtn: this.clickedBtn });
        this.resetForm();
      }
    },
    product() {
      if (this.title !== "add product") {
        this.form = { ...this.product };
        this.form.category = this.product.category;
        this.form.unit = this.product.unit;
        this.oldForm = { ...this.product };
        this.oldForm.category = this.product.category;
      } else {
        this.form.colors = [];
      }
    },
    'form.image'(newImage) {
      if (newImage) {
        this.imagePreview = URL.createObjectURL(newImage);
      } else {
        this.imagePreview = null;
      }
    }
  },
  methods: {
    async submit() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        const formData = new FormData();
        for (const key in this.form) {
          if (
            this.form[key] !== this.oldForm[key] &&
            key !== "unit" &&
            key !== "image" &&
            key !== "category"
          ) {
            formData.append(key, this.form[key]);
          }
        }

        // for (const key in this.images) {
        //   formData.append(`media[${key}]`, this.images[key]);
        // }
        formData.append(`media[]`, this.form.image);

        formData.append("unit_id", this.form.unit.id);
        formData.append("category_id", this.form.category.id);
        formData.append(
          "wholesale_price",
          this.form.price * this.form.quantity
        );

        const payload = { formData, type: "products" };
        let action = "create";
        // for Updating product
        if (this.title !== "add product") {
          formData.append("_method", "patch");
          payload.id = this.product.id;
          action = "update";
        }

        await GlobalServices[action](this.$axios, payload).then((resData) => {
          this.setAlertDataGlobal(resData);
          if (resData.success) {
            this.clickedBtn = "save";
            this.showModal = false;
          }
        });
        this.loading = false;
      }
    },

    resetForm() {
      this.$refs.form.reset();
    },

    addColor() {
      if (this.form.colors) {
        this.form.colors.push(this.newColor);
      }
      this.newColor = null;
    },

    removeColor(index) {
      this.form.colors.splice(index, 1);
    },

    fetchSubcategories(category) {
      this.$store
        .dispatch("support/fetchSubCategoriesList", {
          category_id: category ? category.id : "",
        })
        .then(() => {});
    },
  },
};
</script>

<style lang="scss">
  .theme--light.v-file-input .v-file-input__text--placeholder {
    color: rgb(132 151 173);
    font-size: 12px;
  }

  .v-input--radio-group.v-input--radio-group--row .v-radio {
    align-items: flex-start;
  }
</style>
