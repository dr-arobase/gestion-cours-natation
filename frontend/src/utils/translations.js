export const translations = {
  fr: {
    // Menu principal
    home: 'Accueil',
    swimming: 'Natation',
    lifeguard: 'Sauvetage',
    statistics: 'Statistiques',
    account: 'Compte',
    admin: 'Admin',
    logout: 'Déconnexion',
    theme: 'Thème',
    language: 'Langue',
    
    // Actions
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    search: 'Rechercher',
    export: 'Exporter',
    filter: 'Filtrer',
    
    // Swimming
    swimmingGroups: 'Groupes de natation',
    swimmers: 'Nageurs',
    addSwimmer: 'Ajouter un nageur',
    markAttendance: 'Marquer présence',
    evaluateSkills: 'Évaluer compétences',
    assignLevel: 'Attribuer niveau',
    progression: 'Progression',
    
    // Lifeguard
    lifeguards: 'Sauveteurs',
    testRegistration: 'Inscription au test',
    examScore: 'Note d\'examen',
    certification: 'Certification',
    equipment: 'Équipement',
    
    // Stats
    dashboard: 'Tableau de bord',
    attendanceRate: 'Taux d\'assiduité',
    successRate: 'Taux de réussite',
    
    // Common
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Courriel',
    phone: 'Téléphone',
    level: 'Niveau',
    group: 'Groupe',
    date: 'Date',
    notes: 'Notes',
    active: 'Actif',
    inactive: 'Inactif'
  },
  en: {
    // Main menu
    home: 'Home',
    swimming: 'Swimming',
    lifeguard: 'Lifeguard',
    statistics: 'Statistics',
    account: 'Account',
    admin: 'Admin',
    logout: 'Logout',
    theme: 'Theme',
    language: 'Language',
    
    // Actions
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    export: 'Export',
    filter: 'Filter',
    
    // Swimming
    swimmingGroups: 'Swimming Groups',
    swimmers: 'Swimmers',
    addSwimmer: 'Add Swimmer',
    markAttendance: 'Mark Attendance',
    evaluateSkills: 'Evaluate Skills',
    assignLevel: 'Assign Level',
    progression: 'Progression',
    
    // Lifeguard
    lifeguards: 'Lifeguards',
    testRegistration: 'Test Registration',
    examScore: 'Exam Score',
    certification: 'Certification',
    equipment: 'Equipment',
    
    // Stats
    dashboard: 'Dashboard',
    attendanceRate: 'Attendance Rate',
    successRate: 'Success Rate',
    
    // Common
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    level: 'Level',
    group: 'Group',
    date: 'Date',
    notes: 'Notes',
    active: 'Active',
    inactive: 'Inactive'
  }
};

export const useTranslation = (lang = 'fr') => {
  return translations[lang] || translations.fr;
};
