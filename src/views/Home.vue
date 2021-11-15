<template>
  <div class="page-wrapper">

    <div v-if="selectedFilters.length > 0" class="tool-filters">
      <div class="filters">
        <div v-for="(filter, index) in selectedFilters" :key="index" class="filter">
          <span class="filter-label">{{ filter }}</span>
          <i class="filter-close" @click="removeFilter(filter)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.435 2.12132L11.3137 0L6.71751 4.59619L2.12132 0L0 2.12132L4.59619 6.71751L0 11.3137L2.12132 13.435L6.71751 8.83883L11.3137 13.435L13.435 11.3137L8.83883 6.71751L13.435 2.12132Z" fill="white"/>
            </svg>
          </i>
        </div>
      </div>
      <a class="clear-btn" href="#" @click.prevent="clearFilters">Clear</a>
    </div>

    <div class="jobs-listing">
      <div v-for="job in sortedJobs" :key="job.id" class="job-item">
        <div class="item-left">
          <img :src="job.logo" :alt="job.position" class="item-image">
          <div class="item-content">
            <div class="content-top">
              <p class="item-company">{{ job.company }}</p>
              <p v-if="job.new" class="item-new">New</p>
              <p v-if="job.featured" class="item-featured">Featured</p>
            </div>
            <h1 class="item-title">{{ job.position }}</h1>
            <p class="item-time">
              <span>{{ job.postedAt }}</span>
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="#B7C4C4"/>
              </svg>
              <span>{{ job.contract }}</span>
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="#B7C4C4"/>
              </svg>
              <span>{{ job.location }}</span>
            </p>
          </div>
        </div>
        <div class="item-right">
          <p class="item-tag" @click="addFilter(job.role)">{{ job.role }}</p>
          <p class="item-tag" @click="addFilter(job.level)">{{ job.level }}</p>
          <p v-for="(language, index) in job.languages" :key="index" class="item-tag" @click="addFilter(language)">{{ language }}</p>
          <p v-for="(tool, index) in job.tools" :key="index" class="item-tag" @click="addFilter(tool)">{{ tool }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['appTitle']),
    ...mapGetters('app', ['getJobs']),
    sortedJobs: {
      get() {
        return this.getJobs(this.selectedFilters || [])
      },

      set() {}
    }
  },
  data() {
    return {
      selectedFilters: []
    }
  },
  methods: {
    addFilter(filter) {
      if (!this.selectedFilters.includes(filter))
        this.selectedFilters.push(filter)
    },
    removeFilter(filter) {
      this.selectedFilters = this.selectedFilters.filter(element => {
        return element !== filter
      })
    },
    clearFilters() {
      this.selectedFilters = []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;

  .tool-filters {
    position: relative;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -68px;
    padding: 20px 40px 4px;
    border-radius: 5px;
    background: #FFFFFF;
    box-shadow: 0 15px 20px -5px rgba(13, 113, 130, 0.15);

    @media (max-width: 768px) {
      padding: 20px 24px 4px 20px;
    }
  }

  .filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;

    .filter {
      display: flex;
      align-items: stretch;
      margin-right: 16px;
      margin-bottom: 16px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .filter-label {
      padding: 4px 8px;
      border-radius:  4px 0 0 4px;
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
      line-height: 24px;
      letter-spacing: -0.1px;
      color: #5CA5A5;
      background: rgba(#5CA5A5, .1);
      mix-blend-mode: normal;
    }

    .filter-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #5CA5A5;
      border-radius: 0 4px 4px 0;
      transition: all .4s ease-in-out;
      cursor: pointer;

      &:hover {
        background: #2B3939;
      }
    }
  }

  .clear-btn {
    font-family: $fontSpartan;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: -0.1px;
    color: #7C8F8F;
    transition: all .4s ease-in-out;

    &:hover,
    &:focus,
    &:active {
      color: #5CA5A5;
      text-decoration-line: underline;
    }
  }

  .jobs-listing {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 24px;
    margin-top: 40px;

    @media (max-width: 768px) {
      row-gap: 40px;
      padding-top: 32px;
    }

    .job-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 40px;
      border-radius: 5px;
      background: #FFFFFF;
      box-shadow: 0px 15px 20px -5px rgba(13, 113, 130, 0.15);
      cursor: pointer;

      &:hover,
      &.is-active {
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: #5CA5A5;
          border-radius: 100px 0 0 100px;
        }

        .item-title {
          color: #5CA5A5;
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 32px 24px 4px;
      }

      .item-left {
        display: flex;
        align-items: center;
        width: 100%;

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      .item-image {
        @media (max-width: 768px) {
          width: 48px;
          height: 48px;
          margin-top: -56px;
          margin-bottom: 8px;
        }
      }

      .item-content {
        padding-left: 24px;

        @media (max-width: 768px) {
          width: 100%;
          margin-bottom: 16px;
          padding-left: 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #B7C4C4;
        }
      }

      .content-top {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        @media (max-width: 768px) {
          margin-bottom: 13px;
        }
      }

      .item-company {
        margin: 0 16px 0 0;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        color: #5CA5A5;

        @media (max-width: 768px) {
          font-size: 13px;
          line-height: 15px;
        }
      }

      .item-new {
        margin: 0 8px 0 0;
        padding: 6px 8px 4px;
        border-radius: 12px;
        font-style: normal;
        font-weight: bold;
        font-size: 11px;
        line-height: 14px;
        text-align: center;
        letter-spacing: -0.0846154px;
        text-transform: uppercase;
        color: #FFFFFF;
        background: #5CA5A5;
      }

      .item-featured {
        margin: 0;
        padding: 6px 8px 4px;
        border-radius: 12px;
        font-style: normal;
        font-weight: bold;
        font-size: 11px;
        line-height: 14px;
        text-align: center;
        letter-spacing: -0.0846154px;
        text-transform: uppercase;
        color: #FFFFFF;
        background: #2B3939;
      }

      .item-title {
        margin: 0 0 8px;
        ont-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        color: #2B3939;
        transition: all .4s ease-in-out;

        @media (max-width: 768px) {
          font-size: 15px;
        }
      }

      .item-time {
        margin: 0;
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 24px;
        letter-spacing: -0.115385px;
        color: #7C8F8F;

        @media (max-width: 768px) {
          font-size: 13px;
        }

        svg {
          margin-right: 16px;
          margin-left: 16px;
        }
      }

      .item-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }
      }

      .item-tag {
        margin: 0 16px 16px 0;
        padding: 4px 8px;
        border-radius: 4px;
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: 24px;
        letter-spacing: -0.1px;
        color: #5CA5A5;
        background: rgba(#5CA5A5, .1);
        mix-blend-mode: normal;
        transition: all .4s ease-in-out;
        cursor: pointer;

        &:last-of-type {
          margin-right: 0;
        }

        &:hover {
          color: #ffffff;
          background: rgba(#5CA5A5, 1);
        }
      }
    }
  }
}
</style>
