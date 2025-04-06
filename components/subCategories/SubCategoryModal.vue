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
                placeholder="اكتب اسم الصنف"
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
                <span>الصنف الرئيسي</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-combobox
                v-model="form.parent_id"
                placeholder="اختر الصنف الرئيسي"
                :items="categories"
                item-text="name"
                item-value="id"
                outlined
                dense
                clearable
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
  name: "CategoryModal",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "add category",
    },
    category: {
      type: Object,
      default: () => {
        return {};
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
      showModal: false,
      clickedBtn: "cancel",
      loading: false,
      form: {},
      oldForm: {},
      requiredRules: (v) => !!v || this.$t("v.field_required"),
      modal: false,
    };
  },
  computed: {
    pageTitle() {
      return this.title === "add subCategory"
        ? this.$t("categories.create")
        : this.$t("categories.update");
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
    category() {
      if (this.title !== "add subCategory") {
        this.form = { ...this.category };
        this.form.parent_id = this.category.parent;
        this.oldForm = { ...this.category };
        this.oldForm.parent_id = this.category.parent;
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
          if (this.form[key] !== this.oldForm[key] && key !== "parent_id") {
            formData.append(key, this.form[key]);
          }
        }
        if (this.form.parent_id.id !== this.oldForm.parent_id.id) {
          formData.append("parent_id", this.form.parent_id.id);
        }
        const payload = { type: "categories", formData };
        let action = "create";
        // for Updating category
        if (this.title !== "add subCategory") {
          formData.append("_method", "patch");
          payload.id = this.category.id;
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
      this.form = {};
    },
  },
};
</script>
<style lang="scss"></style>
