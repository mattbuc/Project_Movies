import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from '../stores/session';
import Homepage from '../views/Homepage.vue'
import Movies from '../views/Movies.vue'
import TheMovie from '../views/TheMovie.vue'
import Actors from '../views/Actors.vue'
import TheActor from '../views/TheActor.vue'
import Categories from '../views/Categories.vue'
import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'
import Profil from '../views/Profil.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'Home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Homepage,
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies,
    },
    {
      path: '/movie/:id',
      name: 'TheMovie',
      component: TheMovie,
    },
    {
      path: '/actors',
      name: 'Actors',
      component: Actors,
    },
    {
      path: '/actor/:id',
      name: 'TheActor',
      component: TheActor,
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterForm,
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil,
    },
  ]
})

// Permet une redirection vers la page de login si l'utilisateur n'est pas connecté
router.beforeEach(async (to, from) => {
  // récupérer la session
  const session = useSession()
  if (
    // vérifie si l'utilisateur est connecté
    !session.loggedIn &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Home'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
  else if (
    session.loggedIn &&
    to.name === 'Login'
  ) {
    return { name: 'Homepage' }
  }

})

export default router;
