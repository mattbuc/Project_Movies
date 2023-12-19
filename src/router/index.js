import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from '../stores/session';
import Homepage from '../views/Homepage.vue'
import Movies from '../views/Movies.vue'
import Actors from '../views/Actors.vue'
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
      path: '/movie',
      name: 'Movies',
      component: Movies,
    },
    {
      path: '/actors',
      name: 'Actors',
      component: Actors,
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
    return { name: 'Movies' }
  }

})

export default router;
