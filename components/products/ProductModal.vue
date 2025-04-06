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
            <v-col cols="12" sm="4">
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

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الصنف الرئيسي</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-combobox
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
              />
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الصنف الفرعي</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-combobox
                v-model="form.sub_category"
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
              />
            </v-col>

            <v-col cols="8" sm="4">
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

            <v-col cols="4" sm="4">
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

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>سعر التكلفة</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.price"
                hide-spin-buttons
                placeholder="أدخل سعر تكلفة المنتج"
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
                <span>السعر المخفض</span>
              </div>
              <v-text-field
                v-model="form.sale_price"
                hide-spin-buttons
                placeholder="أدخل السعر المخفض"
                type="number"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>تاريخ نهاية التخفيض</span>
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
              </v-menu>
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
                  :min="today"
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

            <v-col cols="12" sm="3">
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

            <v-col cols="12" sm="3">
              <div class="text-start mb-2">
                <span>أقصى كمية لكل عميل</span>
              </div>
              <v-text-field
                v-model="form.max_items_per_user"
                placeholder="كم أقصى كمية لكل عميل"
                type="number"
                hide-spin-buttons
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="3">
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
                required
              />
            </v-col>

            <v-col cols="12" sm="3">
              <div class="text-start mb-2">
                <span>رمز التخزين sku</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.sku"
                :rules="[requiredRules]"
                placeholder="ادخل رمز التخزين sku"
                type="text"
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

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t("products.main_image") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-file-input
                v-model="form.images"
                placeholder="صور المنتج"
                :rules="[requiredRules]"
                outlined
                dense
                multiple
                append-icon="mdi-file-image"
                @change="onFileChange"
              />
            </v-col>

            <v-col cols="12" sm="6" class="mb-5">
              <v-row>
                <v-col
                  v-for="(image, index) in imageUrls"
                  :key="index"
                  cols="6"
                  sm="4"
                >
                  <v-card>
                    <v-img
                      :src="image"
                      class="white--text align-end mt-3"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    >
                      <v-card-title> صورة {{ index + 1 }} </v-card-title>
                      <v-btn
                        icon
                        small
                        class="close-btn"
                        @click="removeImage(index)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>رابط مقطع فيديو</span>
              </div>
              <v-text-field
                v-model="form.video"
                placeholder="ادخل رابط مقطع الفيديو"
                type="text"
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>الماركة التجارية</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>

              <v-combobox
                v-model="form.brand"
                placeholder="اختر الماركة التجارية"
                :rules="[requiredRules]"
                :items="brands"
                item-text="name"
                item-value="id"
                outlined
                dense
                clearable
              />
            </v-col>

            <v-col cols="12">
              <div class="text-start mb-2">
                <span>لون المنتج</span>
              </div>

              <v-row v-if="form.colors && form.colors.length" class="my-2">
                <v-col
                  v-for="(color, index) in form.colors"
                  :key="index"
                  cols="auto"
                  class="my-2"
                >
                  <v-chip
                    close
                    :color="color"
                    text-color="white"
                    @click:close="removeColor(index)"
                  >
                    {{ color }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-color-picker
                v-model="newColor"
                hide-inputs
                validate-on-blur
                outlined
                dense
                hide-canvas
                hide-sliders
                show-swatches
                style="max-width: 100% !important"
                @input="addColor"
              />
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
    categories: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      images: [],
      imageUrls: [],
      expiration_date: false,
      production_date: false,
      sale_end: false,
      showModal: false,
      today: new Date().toISOString().split("T")[0],
      clickedBtn: "cancel",
      loading: false,
      form: {
        colors: [],
        images: [],
      },
      oldForm: {},
      newColor: null,
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
        // Create a deep copy of the product to avoid mutating the store
        const productCopy = JSON.parse(JSON.stringify(this.product));

        this.form = { ...productCopy };
        this.form.category = productCopy.category;
        this.form.unit = productCopy.unit;
        this.form.sub_category = productCopy.sub_category;
        this.form.price = productCopy.price / productCopy.quantity;
        this.form.status = productCopy.status ? 1 : 0;
        this.form.requires_shipping = productCopy.requires_shipping ? 1 : 0;
        this.form.is_taxable = productCopy.is_taxable ? 1 : 0;

        this.oldForm = { ...productCopy };
        this.oldForm.category = productCopy.category;

        // Initialize colors array
        if (productCopy.colors) {
          this.form.colors = Array.isArray(productCopy.colors)
            ? [...productCopy.colors]
            : [productCopy.colors];
        } else {
          this.form.colors = [];
        }

        // Initialize images array
        if (productCopy.media) {
          this.form.images = Array.isArray(productCopy.media)
            ? [...productCopy.media]
            : [productCopy.media];
        } else {
          this.form.images = [];
        }

        this.imageUrls = productCopy.media.map((m) => m.url);
      } else {
        this.form.colors = [];
        this.form.images = [];
        this.imageUrls = [];
      }
    },
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
            key !== "brand" &&
            key !== "images" &&
            key !== "category" &&
            key !== "sub_category" &&
            key !== "colors"
          ) {
            formData.append(key, this.form[key]);
          }
        }

        // Handle images properly
        if (this.form.images && this.form.images.length > 0) {
          // If images are File objects (new uploads)
          if (this.form.images[0] instanceof File) {
            this.form.images.forEach((file, index) => {
              formData.append(`images[${index}]`, file);
            });
          } else if (typeof this.form.images[0] === "string") {
            this.form.images.forEach((url, index) => {
              formData.append(`images[${index}]`, url);
            });
          }
        }

        formData.append("product_unit_id", this.form.unit.id);
        formData.append("category_id", this.form.category.id);
        formData.append("sub_category_id", this.form.sub_category.id);
        formData.append("brand_id", this.form.brand.id);
        formData.append("price", this.form.price * this.form.quantity);

        for (const key in this.form.colors) {
          formData.append(`colors[${key}]`, this.form.colors[key]);
        }

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
      this.imageUrls = [];
    },

    addColor() {
      if (this.newColor && this.newColor.hex) {
        if (!this.form.colors) {
          this.form.colors = [];
        }
        // Check if color already exists
        if (!this.form.colors.includes(this.newColor.hex)) {
          this.form.colors.push(this.newColor.hex);
        }
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

    onFileChange(files) {
      if (files) {
        this.form.images = files;
        this.imageUrls = files.map((file) => URL.createObjectURL(file));
      }
    },

    removeImage(index) {
      this.form.images.splice(index, 1);
      this.imageUrls.splice(index, 1);
    },

    getFileNameFromUrl(url) {
      return url.substring(url.lastIndexOf("/") + 1);
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
