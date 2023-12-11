<template>
  <div>
    <base-card>
      <div class="links">
        <table style="width: 50%;">
          <tr>
            <th><router-link to="/installationmanual">
                <h1>Installation manual</h1>
              </router-link></th>
            <th><router-link to="/usermanual">
                <h1>User manual</h1>
              </router-link></th>
          </tr>
        </table>
      </div>
      <p>
        <a href="https://www.linkedin.com/in/aleksandar-matic-8a7b21120/" target="_blank"><img class="profile"
            src="../../media/images/profile.jpg" alt="" /></a>
        Hello, everyone! My name is <b>Aleksandar Matic</b>, and I&#39;m currently a high school professor of Information
        Technologies aiming to develop my career as a <b>full stack developer</b>. I graduated on
        <b>Faculty of Information Technologies</b> on <b>Slobomir P University</b> and have been in education department
        for the last 12 years <b>teaching programming languages, wed development, databases and a little bit of web
          design</b>. I&#39;ve decided to switch my current career path to development, so, here I am. My skills include
        (but are not limited to) the following technologies:
      </p>
      <ol>
        <li>Backend <ul>
            <li>Node.js</li>
            <li>C#</li>
            <li>.NET</li>
            <li>ASP.NET Web API</li>
            <li>ASP.NET MVC</li>
          </ul>
        </li>
        <li>Databases <ul>
            <li>T-SQL</li>
            <li>MS SQL server</li>
            <li>MongoDB</li>
          </ul>
        </li>
        <li>Frontend <ul>
            <li>JavaScript</li>
            <li>Vue.js</li>
            <li>React.js</li>
            <li>Razor Pages</li>
            <li>WPF (XAML)</li>
          </ul>
        </li>
        <li>Less relevant or uncategorized skills <ul>
            <li>GIT, HTML, CSS, JWT, Linq, JSON, Entity Framework...</li>
          </ul>
        </li>
      </ol>
      <p>
        Now, let&#39;s not make this longer than it needs to be. In case you need some other info or contant data, feel
        free to visit my
        <a href="https://www.linkedin.com/in/aleksandar-matic-8a7b21120/" target="_blank">LinkedIn profile</a>. Let&#39;s
        get to the instruction itself, shall we?
      </p>
      <p>
        Before I dive into installation, let me briefly explain technologies used in this project for my potential future
        employees:
      </p>
      <ol>
        <li>
          <b>Backend</b>
          <ol type="a">
            <li>ASP.NET Web API</li>
            <li>Entity Framework</li>
            <li>AutoMapper for converting models to DTOs and vice-versa</li>
            <li>Repository Pattern for organizing database connection</li>
            <li>Code-first migrations</li>
            <li>Unit of Work pattern with some small modifications</li>
            <li>JWT for authentication</li>
            <li>Refresh token</li>
          </ol>
        </li>
        <li>
          <b>Frontend</b>
          <ol type="a">
            <li>Vue.js framework</li>
            <li>Vuex for organizing data</li>
            <li>
              Router for managing routes, redirections and authentication guards
            </li>
            <li>Standard HTML and CSS for some basic design</li>
          </ol>
        </li>
        <li>
          <b>Database</b>
          <ol type="a">
            <li>T-SQL server</li>
          </ol>
        </li>
      </ol>
      <p>Proceed to:
        <router-link to="/installationmanual"> 
          <h3>Required software installation guide in more details</h3>
        </router-link>
        <router-link to="/usermanual">
          <h3>Application user manual</h3>
        </router-link>
      </p>
    </base-card>
  </div>
</template>

<script>
import * as helpers from '../../helpers.js';

export default {
  created() {
    helpers.ResetLocalStorage();
  }
}
</script>

<style scoped>
p {
  text-align: justify;
}

.profile {
  height: 25%;
  width: 25%;
  float: right;
  border-radius: 25px;
  margin: 15px;
}

.links h1 {
  display: inline;
}

.links a:visited,
a:link {
  text-decoration: none;
}
</style>
