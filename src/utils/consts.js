export const tattoosSpecialities = [
    "Realismo",
    "Acuarela",
    "Tribal",
    "Graffiti",
    "Old School",
    "Neotradicional",
    "Gotico",
    "Escrito",
    "Geométrico",
    "Minimalista",
    "Dotwork",
    "Japonés",
    "Flechas",
    "Glifos",
    "Numeros Romanos",
    "Corazones"
]

export const profileSettingFields = {
    tattooist: {
        name: "Nombre",
        specialty: "Especialidad",
        numberPhone: "Teléfono",
        experience: "Experiencia",
        address: "Dirección",
        description: "Descripción",
    },
    userSocial: {
        facebook: "Facebook",
        instagram: "Instagram",
        twitter: "Twitter",
        tiktok: "TikTok",
    },
    userData: {
        name: "Nombre",
    }
}

export const commonRoutes = [
    {
        name: 'TATUADORES',
        route: '/artists',
    },
    {
        name: 'TATUAJES',
        route: '/tattoos',
    },
    {
        name: '¿TATÚAS?',
        route: '/register-tatto',
    },
    {
        name: 'CONTÁCTENOS',
        route: '/contact',
    },
    {
        name: 'REGISTRARSE',
        route: '/register-user',
    },
    {
        name: 'INICIAR SESIÓN',
        route: '/login',
    }
]

export const loggedRoutes = {
    tattooistRoutes: [
        {
            name: 'TATUADORES',
            route: '/artists',
        },
        {
            name: 'TATUAJES',
            route: '/tattoos',
        },
        {
            name: 'PERFIL',
            route: '/profile',
        },
        {
            name: 'CONTÁCTENOS',
            route: '/contact',
        }
    ],
    userRoutes: [
        {
            name: 'TATUADORES',
            route: '/artists',
        },
        {
            name: 'TATUAJES',
            route: '/tattoos',
        },
        {
            name: 'AJUSTES DE PERFIL',
            route: '/profile/settings',
        },
        {
            name: 'CONTÁCTENOS',
            route: '/contact',
        }
    ]
}

export const placeholderUserImage = "https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"