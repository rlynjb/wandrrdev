<template>
<div class="pt-16">
  <v-row justify="center" align="center" class="pt-16 pb-16">
    <v-col cols="3">
      <img src="logo2.png" />
    </v-col>
    <v-col cols="8" class="pt-16 pb-16 pr-16">
      <h3 class="primary--text">Hi, my name is</h3>
      <h1 class="font-weight-light text-lg-h1">ReinaLyn</h1>
      <h2 class="primary--text">I build stuff for the internet.</h2>
      <p>
        I’m a software engineer specializing in building (and occasionally designing) digital experiences. Currently, I’m focused on extending features, rafactoring, and rewriting code on existing applications at Switch.
      </p>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="pt-16 pb-16">
    <v-col cols="8" id="about" class="pt-16 pb-16">
      <h3 class="primary--text">About Me</h3>
      <p>
        Hello! My name is ReinaLyn and I enjoy creating things that live on the internet. My interest in web development started back in 2004 when I decided to try Macromedia Flash — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
      </p>
      <p>
        Fast-forward to today, and I’ve had the privilege of working at start-ups, an advertising agency, a medium size company, and a huge corporation. My main focus these days is building accessible, inclusive products and digital experiences at Switch for a variety of clients.
      </p>
      <p>
        I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
      </p>
      <h4>
        Here are a few technologies I’ve been working with recently:
      </h4>
      <ul>
        <li>JavaScript (ES6+)</li>
        <li>Vue.js</li>
        <li>Node.js</li>
        <li>TypeScript</li>
      </ul>
    </v-col>
    <v-col cols="5">
    </v-col>

    <v-col cols="9" id="experience" class="pt-16 pb-16">
      <h3 class="primary--text">Where I've Worked</h3>
      <v-timeline align-top dense>
        <v-timeline-item small
          v-for="(expItem, expIndex) in experience" :key="'exp-'+expIndex">
          <h3 class="primary--text">
            {{ expItem.company }}
            <b class="subtitle-1 d-block">{{ expItem.date }}</b>
          </h3>
          <h6></h6>
          <ul>
            <li v-for="(expDesc, expDescIndex) in expItem.desc" :key="'expDesc-'+expDescIndex">
              {{ expDesc }}
            </li>
          </ul>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <!--
    <v-col cols="12" id="work" class="pt-16 pb-16">
      <h3 class="primary--text mb-4">Some Things I've Built</h3>
      <v-row>
        <v-col v-for="(workItem, workIndex) in work" :key="'workItem-'+workIndex"
          cols="3">
          <img :src="workItem.img" />
          <h3>{{ workItem.title }}</h3>
          <p>{{ workItem.desc }}</p>
          <ul>
            <li v-for="(workItemSkills, workItemSkillsIndex) in workItem.technical_skills"
              :key="'workItemSkills-'+workItemSkillsIndex">
              {{ workItemSkills }}
            </li>
          </ul>
          <v-btn>View</v-btn>
        </v-col>
      </v-row>
    </v-col>
    -->
  </v-row>

  <v-row justify="center" align="center" class="pt-16 pb-16">
    <v-col cols="6" id="contact" class="pt-16 pb-16">
      <h3 class="primary--text">Get In Touch</h3>
      <p>
        I’m not currently looking for any new opportunities, but my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      experience: [
        {
          company: 'Switch',
          date: 'August 2017 - Present // Las Vegas, NV',
          desc: [
            'Develop internal apps using Vue.js consuming and handling thousands of data.',
            'Communicate with developers & managers on a daily basis to build features from ideation to production.',
            'Built impressive landing pages using CSS responsive techniques and design concepts',
            'Occasionally design UI/UX based on project requirements.',
            'Occasionally maintain customer facing websites using Wordpress.'
          ]
        },
        {
          company: 'JS Products',
          date: 'June 2016 - August 2017 // Las Vegas, NV',
          desc: [
            'Developed all public facing websites for stakeholders using Grav, Laravel, Zurb Foundation.',
            'Collaborated with UI/UX Designers using InVision while helping the company keep up to date with current web technology.',
            'Developed a theme starter kit and implemented it on projects.',
            'Developed a customer-facing web app for Kobalttools.com using JavaScript.'
          ]
        },
        {
          company: 'Brydan Solutions',
          date: 'April 2015 - June 2016 // Las Vegas, NV',
          desc: [
            "Designed websites using Divi theme and researched plugins that fit required functionality.",
            "Developed a customer-facing web app using JavaScript and PHP when necessary.",
            "Clients included Golden Entertainment (goldent.com), PT’s Pub Las Vegas (pteglv.com)"
          ]
        },
        {
          company: 'Gravitas Works',
          date: 'May 2014 - March 2015 // Las Vegas, NV',
          desc: [
            "Gained coding experience through pair programming and guidance from our mentor/CTO",
            "Worked on solving bugs/performance issues",
            "Documented work and communicate issues when they arise",
            "Researched and wrote code snippet Google authentication using Golang and JWT",
            "Wrote code using Golang to interact with APIs",
            "Wrote code for Web scraper using Ruby and Regex",
            "Convert Ember.js web application to use Ember-CLI",
            "Researched latest news/articles and version releases of Ember.js",
            "Wrote a responsive grid system from scratch to avoid bloated CSS",
            "Researched and implemented BEM and OOCSS to organize CSS"
          ]
        }
      ],
      work: [
        {
          title: 'my portfolio',
          img: 'http://placehold.it/300x200',
          desc: 'where i showcase my skills',
          technical_skills: ['vue.js', 'nuxt.js', 'static site'],
          link: 'wandrr.dev'
        }
      ],
    }
  }
}
</script>

<style>
img {
  width: 100%;
}
</style>