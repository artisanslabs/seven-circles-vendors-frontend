<template>
  <v-dialog v-model="showModal" max-width="960" persistent>
    <v-card class="text-center px-8 py-4 modal-card">
      <div class="flex-between">
        <h2 class="text-start fs-20 title-color">
          {{ pageTitle }}
        </h2>
        <v-btn icon dark class="close-dialog-icon" @click="showModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("v.name") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.name"
                placeholder="أدخل اسم المنتج"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.category") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-combobox
                v-model="form.category"
                placeholder="اختر الصنف"
                :items="categories"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.unit") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-combobox
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
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.price") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.price"
                hide-spin-buttons
                placeholder="أدخل سعر المنتج"
                type="number"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>سعر التخفيض</span>
              </div>
              <v-text-field
                v-model="form.sale_price"
                hide-spin-buttons
                placeholder="أدخل سعر التخفيض"
                type="number"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>تاريخ انتهى التخفيض</span>
              </div>
              <v-menu
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
                    placeholder="أختر تاريخ انتهى التخفيض"
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
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>الوزن</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.weight"
                placeholder="أدخل وزن المنتج"
                type="number"
                hide-spin-buttons
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.production_date") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>

              <v-menu
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
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.expiration_date") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-menu
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
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.qty") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.quantity"
                placeholder="ادخل كمية المنتج"
                type="number"
                hide-spin-buttons
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span> أعلى كمية </span>
              </div>
              <v-text-field
                v-model="form.max_items_per_user"
                placeholder="ادخل أعلى كمية"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <!-- <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>الحد الأقصى للكمية لكل طلب</span>
              </div>
              <v-text-field
                v-model="form.maximum_quantity_per_order"
                placeholder="ادخل الحد الأقصى للكمية لكل طلب"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>??</span>
              </div>
              <v-text-field
                v-model="form.notify_quantity"
                placeholder="ادخل أعلى كمية"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
              />
            </v-col> -->

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.main_image") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-file-input
                v-model="form.image"
                placeholder="صور المنتج"
                :rules="[requiredRules]"
                outlined
                dense
                append-icon="mdi-file-image"
              />
            </v-col>

            <v-col cols="12" sm="2">
              <v-card>
                <img :src="imagePreview" alt="Product Image" v-if="imagePreview" height="80" class="grey darken-4" />
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("products.appear_status") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
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
                <span>هل يتطلب شحن؟</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-radio-group v-model="form.requires_shipping" row class="ms-n4">
                <v-radio
                  color="#0f6d39"
                  :label="$t('btn.yes')"
                  :value="1"
                />
                <v-radio
                  color="#0f6d39"
                  :label="$t('btn.no')"
                  :value="0"
                />
              </v-radio-group>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>هل المنتج خاضع للضريبة؟</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-radio-group v-model="form.is_taxable" row class="ms-n4">
                <v-radio
                  color="#0f6d39"
                  :label="$t('btn.yes')"
                  :value="1"
                />
                <v-radio
                  color="#0f6d39"
                  :label="$t('btn.no')"
                  :value="0"
                />
              </v-radio-group>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>رمز gtin</span>
              </div>
              <v-text-field
                v-model="form.gtin"
                placeholder="ادخل رمز gtin"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
                min="8"
                max="14"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>رمز التخزين sku</span>
              </div>
              <v-text-field
                v-model="form.sku"
                placeholder="ادخل رمز التخزين sku"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
                min="10"
                max="20"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>أقصى كمية</span>
              </div>
              <v-text-field
                v-model="form.quantity"
                placeholder="أقصى كمية"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12">
              <div class="text-start mb-2">
                <span>لون المنتج</span>
              </div>
              <v-color-picker
                v-model="form.color"
                multiple
                hide-inputs
                validate-on-blur
                outlined
                dense
                hide-canvas
                hide-sliders
                show-swatches
                style='max-width: 100% !important;'
              ></v-color-picker>
            </v-col>

            <v-col cols="12">
              <div class="text-start mb-2">
                <span>{{ $t("products.details") }}</span>
              </div>
              <v-textarea
                v-model="form.description"
                name="input-7-1"
                placeholder="ادخل تفاصيل المنتج"
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" class="modal-btns mt-4 mb-6 d-flex justify-end">
              <v-btn :loading="loading" class="py-6 px-10 mx-2" @click="submit">
                {{ $t("btn.save") }}
              </v-btn>
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
      type: Object,
      default: () => {
        return {};
      },
    },
    categories: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
  data() {
    return {
      imagePreview: null,
      medias: [],
      expiration_date: false,
      production_date: false,
      sale_end: false,
      showModal: false,
      passwordStatus: false,
      clickedBtn: "cancel",
      loading: false,
      form: {},
      oldForm: {},
      requiredRules: (v) => !!v || this.$t("v.field_required"),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
    };
  },
  computed: {
    pageTitle() {
      return this.title === "add product" ? "إضافة منتج" : "تعديل منتج";
    }
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
            key !== "category" &&
            key !== "image" &&
            key !== "color" &&
            key !== "sku" &&
            key !== "gtin"
          ) {
            formData.append(key, this.form[key]);
          }
        }

        // Append the media files
        let mediaIndex = 0;
        for (const key in this.form) {
          if (key === "image") {
            formData.append(`media[${mediaIndex}]`, this.form[key]);
            mediaIndex++;
          }
        }

        // Loop through the medias array and append each value
        for (const value of Object.values(this.medias)) {
          formData.append(`media[${mediaIndex}]`, value);
          mediaIndex++;
        }

        formData.append("product_unit_id", this.form.unit.id);
        formData.append("color", this.form.color.hex);
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
      this.form = {
        name: "",
        email: "",
        password: "",
      };
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
