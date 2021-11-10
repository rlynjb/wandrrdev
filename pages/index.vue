<template>
<div>
  <v-row justify="center" align="center" class="pt-16 pb-16">
    <v-col cols="4">
      <img src="http://placehold.it/350x200" />
    </v-col>
    <v-col cols="8" class="pt-16 pb-16 pr-16">
      <p>Hi, my name is</p>
      <h1>ReinaLyn</h1>
      <h2>I build things for the web.</h2>
      <p>
        I’m a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products at Upstatement.
      </p>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="pt-16 pb-16">
    <v-col cols="12" id="about" class="pt-16 pb-16">
      <h3 class="primary--text">About Me</h3>
      <p>
        Hello! My name is ReinaLyn and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
      </p>
      <p>
        Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.
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

    <v-col cols="12" id="experience" class="pt-16 pb-16">
      <h3 class="primary--text">Where I've Worked</h3>
      <v-timeline align-top dense>
        <v-timeline-item small
          v-for="(expItem, expIndex) in experience" :key="'exp-'+expIndex">
          <h3>
            {{ expItem.company }}
            <b class="subtitle-1 d-block">{{ expItem.date }}</b>
          </h3>
          <h6></h6>
          <p>{{ expItem.desc }}</p>
        </v-timeline-item>
      </v-timeline>
    </v-col>

    <v-col cols="12" id="work" class="pt-16 pb-16">
      <h3 class="primary--text">Some Things I've Built</h3>
      <v-row>
        <v-col cols="3">
          <img src="http://placehold.it/300x200" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="pt-16 pb-16">
    <v-col cols="12" id="contact" class="pt-16 pb-16">
      <h3 class="primary--text">Get In Touch</h3>
      <p>
        Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
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
          date: '2017 - Present',
          desc: 'collaborated with frontend and backend developers to brainstorm ideas on building projects from idea to deployment. utilized vue.js, quasar, d3.js, and other front-end libraries.'
        },
        {
          company: 'JS Products',
          date: '2011 - 2013',
          desc: 'built and translated public facing website designs for stakeholders. utilized grav, foundation css framework.'
        },
        {
          company: 'Brydan Solutions',
          date: '2011 - 2013',
          desc: 'built websites for clients using wordpress'
        },
        {
          company: 'Persopo',
          date: '2011 - 2013',
          desc: 'built front facing of application. utilized ember.js'
        },
        {
          company: 'Galavantier',
          date: '2011 - 2013',
          desc: 'built and translated UI designs to functional drupal theme using html, css, and responsive techniques.'
        }
      ],
      work: [
        {
          title: '',
          desc: '',
          technical_skills: [],
          link: ''
        }
      ],
    }
  }
}
</script>