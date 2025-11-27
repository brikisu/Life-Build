/*
   1) CONSTANTES E CONFIGURAÇÕES
*/

// Chave usada no localStorage para persistir os dados da aplicação
const STORAGE_KEY = 'routineAppData_v2_multilang';

// Dados padrão usados na primeira execução (apenas exemplo/teste)
const DEFAULT_DATA = {
  // Rotinas iniciais de exemplo (ajuste como quiser)
  routines: [
    {
      id: 't1',
      title: 'Treino de força (peito e tríceps)',
      description: 'Foco em progressão de carga.',
      date: new Date().toISOString().split('T')[0], // data de hoje no formato YYYY-MM-DD
      time: '08:00',
      priority: 'high',
      tag: 'saúde',
      completed: false,
      status: 'doing'
    },
    {
      id: 't2',
      title: 'Reunião de planejamento semanal',
      description: 'Revisar metas e definir prioridades.',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      priority: 'medium',
      tag: 'trabalho',
      completed: false,
      status: 'todo'
    },
    {
      id: 't3',
      title: 'Ler 50 páginas do livro "Atomic Habits"',
      description: 'Hábito de leitura diário.',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // amanhã
      time: undefined,
      priority: 'low',
      tag: 'estudos',
      completed: false,
      status: 'todo'
    },
    {
      id: 't4',
      title: 'Pagar contas mensais',
      description: 'Água, luz, internet.',
      date: new Date().toISOString().split('T')[0],
      time: undefined,
      priority: 'high',
      tag: 'pessoal',
      completed: true,
      status: 'done'
    }
  ],
  // Etiquetas iniciais
  tags: [
    { id: 'tag1', name: 'pessoal', color: '#4f46e5' },
    { id: 'tag2', name: 'trabalho', color: '#10b981' },
    { id: 'tag3', name: 'saúde', color: '#ef4444' },
    { id: 'tag4', name: 'estudos', color: '#f59e0b' }
  ],
  // Preferências iniciais
  preferences: {
    theme: 'light',
    showCompleted: true,
    notifications: false,
    language: 'pt-BR',
    fontFamily: 'Inter',
    fontSize: '16'
  },
  // Perfil do usuário
  profile: {
    displayName: 'Carlos',
    userName: 'onror',
    email: 'exemplo@gmail.com'
  }
};

/* ===========================
   1.1) TRADUÇÕES MULTILÍNGUE (PT / EN / ES / FR) - VERSÃO COMPLETA
   =========================== */

const I18N = {
  'view.hoje': {
    'pt-BR': 'Hoje',
    'en-US': 'Today',
    'es-ES': 'Hoy',
    'fr-FR': "Aujourd'hui"
  },
  'view.todasRotinas': {
    'pt-BR': 'Todas as Rotinas',
    'en-US': 'All Routines',
    'es-ES': 'Todas las Rutinas',
    'fr-FR': 'Toutes les routines'
  },
  'view.calendario': {
    'pt-BR': 'Calendário',
    'en-US': 'Calendar',
    'es-ES': 'Calendario',
    'fr-FR': 'Calendrier'
  },
  'view.graficos': {
    'pt-BR': 'Gráficos',
    'en-US': 'Charts',
    'es-ES': 'Gráficos',
    'fr-FR': 'Graphiques'
  },
  'view.config': {
    'pt-BR': 'Configurações',
    'en-US': 'Settings',
    'es-ES': 'Configuración',
    'fr-FR': 'Paramètres'
  },

  // Menu principal
  'menu.visaoGeral': {
    'pt-BR': 'Visão Geral',
    'en-US': 'Overview',
    'es-ES': 'Resumen',
    'fr-FR': 'Vue d\'ensemble'
  },
  'menu.etiquetas': {
    'pt-BR': 'Etiquetas',
    'en-US': 'Tags',
    'es-ES': 'Etiquetas',
    'fr-FR': 'Étiquettes'
  },
  'menu.filtros': {
    'pt-BR': 'Filtros',
    'en-US': 'Filters',
    'es-ES': 'Filtros',
    'fr-FR': 'Filtres'
  },

  // Filtros
  'filter.pendentes': {
    'pt-BR': 'Pendentes',
    'en-US': 'Pending',
    'es-ES': 'Pendientes',
    'fr-FR': 'En attente'
  },
  'filter.concluidas': {
    'pt-BR': 'Concluídas',
    'en-US': 'Completed',
    'es-ES': 'Completadas',
    'fr-FR': 'Terminées'
  },
  'filter.alta': {
    'pt-BR': 'Prioridade alta',
    'en-US': 'High Priority',
    'es-ES': 'Prioridad alta',
    'fr-FR': 'Priorité haute'
  },
  'filter.media': {
    'pt-BR': 'Prioridade média',
    'en-US': 'Medium Priority',
    'es-ES': 'Prioridad media',
    'fr-FR': 'Priorité moyenne'
  },
  'filter.baixa': {
    'pt-BR': 'Prioridade baixa',
    'en-US': 'Low Priority',
    'es-ES': 'Prioridad baja',
    'fr-FR': 'Priorité basse'
  },
  'filter.semData': {
    'pt-BR': 'Sem data',
    'en-US': 'No Date',
    'es-ES': 'Sin fecha',
    'fr-FR': 'Sans date'
  },

  // Botões
  'button.novaRotina': {
    'pt-BR': '+ Nova rotina',
    'en-US': '+ New routine',
    'es-ES': '+ Nueva rutina',
    'fr-FR': '+ Nouvelle routine'
  },
  'button.novaEtiqueta': {
    'pt-BR': '+ Nova etiqueta',
    'en-US': '+ New tag',
    'es-ES': '+ Nueva etiqueta',
    'fr-FR': '+ Nouvelle étiquette'
  },
  'button.salvar': {
    'pt-BR': 'Salvar',
    'en-US': 'Save',
    'es-ES': 'Guardar',
    'fr-FR': 'Enregistrer'
  },
  'button.cancelar': {
    'pt-BR': 'Cancelar',
    'en-US': 'Cancel',
    'es-ES': 'Cancelar',
    'fr-FR': 'Annuler'
  },
  'button.adicionar': {
    'pt-BR': 'Adicionar',
    'en-US': 'Add',
    'es-ES': 'Añadir',
    'fr-FR': 'Ajouter'
  },
  'button.excluir': {
    'pt-BR': 'Excluir',
    'en-US': 'Delete',
    'es-ES': 'Eliminar',
    'fr-FR': 'Supprimer'
  },
  'button.duplicar': {
    'pt-BR': 'Duplicar',
    'en-US': 'Duplicate',
    'es-ES': 'Duplicar',
    'fr-FR': 'Dupliquer'
  },
  'button.saveSettings': {
    'pt-BR': 'Salvar Configurações',
    'en-US': 'Save Settings',
    'es-ES': 'Guardar configuración',
    'fr-FR': 'Enregistrer les paramètres'
  },
  'button.resetSettings': {
    'pt-BR': 'Restaurar Padrões',
    'en-US': 'Reset to Default',
    'es-ES': 'Restaurar valores',
    'fr-FR': 'Restaurer par défaut'
  },
  'button.editarPerfil': {
    'pt-BR': 'Editar perfil de usuário',
    'en-US': 'Edit user profile',
    'es-ES': 'Editar perfil de usuario',
    'fr-FR': 'Modifier le profil utilisateur'
  },
  'button.adicionarTarefa': {
    'pt-BR': '+ Adicionar',
    'en-US': '+ Add',
    'es-ES': '+ Añadir',
    'fr-FR': '+ Ajouter'
  },

  // Configurações
  'label.darkMode': {
    'pt-BR': 'Modo escuro',
    'en-US': 'Dark Mode',
    'es-ES': 'Modo oscuro',
    'fr-FR': 'Mode sombre'
  },
  'label.notifications': {
    'pt-BR': 'Ativar notificações do navegador',
    'en-US': 'Enable browser notifications',
    'es-ES': 'Activar notificaciones del navegador',
    'fr-FR': "Activer les notifications du navigateur"
  },
  'label.appLanguage': {
    'pt-BR': 'Idioma do aplicativo',
    'en-US': 'App Language',
    'es-ES': 'Idioma de la app',
    'fr-FR': "Langue de l'application"
  },
  'label.fontFamily': {
    'pt-BR': 'Fonte personalizada',
    'en-US': 'Font Family',
    'es-ES': 'Fuente',
    'fr-FR': 'Police'
  },
  'label.fontSize': {
    'pt-BR': 'Tamanho da fonte',
    'en-US': 'Font Size',
    'es-ES': 'Tamaño de fonte',
    'fr-FR': 'Taille de police'
  },

  // Perfil
  'profile.meuPerfil': {
    'pt-BR': 'Meu perfil',
    'en-US': 'My profile',
    'es-ES': 'Mi perfil',
    'fr-FR': 'Mon profil'
  },
  'profile.nomeExibido': {
    'pt-BR': 'Nome exibido',
    'en-US': 'Display name',
    'es-ES': 'Nombre visible',
    'fr-FR': "Nom affiché"
  },
  'profile.nomeUsuario': {
    'pt-BR': 'Nome de usuário',
    'en-US': 'Username',
    'es-ES': 'Nombre de usuario',
    'fr-FR': "Nom d'utilisateur"
  },
  'profile.email': {
    'pt-BR': 'E-mail',
    'en-US': 'Email',
    'es-ES': 'Correo electrónico',
    'fr-FR': 'Email'
  },
  'profile.mostrar': {
    'pt-BR': 'Mostrar',
    'en-US': 'Show',
    'es-ES': 'Mostrar',
    'fr-FR': 'Afficher'
  },
  'profile.ocultar': {
    'pt-BR': 'Ocultar',
    'en-US': 'Hide',
    'es-ES': 'Ocultar',
    'fr-FR': 'Cacher'
  },
  'profile.editar': {
    'pt-BR': 'Editar',
    'en-US': 'Edit',
    'es-ES': 'Editar',
    'fr-FR': 'Modifier'
  },

  // Painel de detalhes
  'details.titulo': {
    'pt-BR': 'Título',
    'en-US': 'Title',
    'es-ES': 'Título',
    'fr-FR': 'Titre'
  },
  'details.descricao': {
    'pt-BR': 'Descrição',
    'en-US': 'Description',
    'es-ES': 'Descripción',
    'fr-FR': 'Description'
  },
  'details.data': {
    'pt-BR': 'Data',
    'en-US': 'Date',
    'es-ES': 'Fecha',
    'fr-FR': 'Date'
  },
  'details.hora': {
    'pt-BR': 'Hora',
    'en-US': 'Time',
    'es-ES': 'Hora',
    'fr-FR': 'Heure'
  },
  'details.prioridade': {
    'pt-BR': 'Prioridade',
    'en-US': 'Priority',
    'es-ES': 'Prioridad',
    'fr-FR': 'Priorité'
  },
  'details.etiqueta': {
    'pt-BR': 'Etiqueta',
    'en-US': 'Tag',
    'es-ES': 'Etiqueta',
    'fr-FR': 'Étiquette'
  },

  // Prioridades
  'priority.alta': {
    'pt-BR': 'Alta',
    'en-US': 'High',
    'es-ES': 'Alta',
    'fr-FR': 'Haute'
  },
  'priority.media': {
    'pt-BR': 'Média',
    'en-US': 'Medium',
    'es-ES': 'Media',
    'fr-FR': 'Moyenne'
  },
  'priority.baixa': {
    'pt-BR': 'Baixa',
    'en-US': 'Low',
    'es-ES': 'Baja',
    'fr-FR': 'Basse'
  },

  // Estados
  'status.todo': {
    'pt-BR': 'A fazer',
    'en-US': 'To do',
    'es-ES': 'Por hacer',
    'fr-FR': 'À faire'
  },
  'status.doing': {
    'pt-BR': 'Em progresso',
    'en-US': 'In progress',
    'es-ES': 'En progreso',
    'fr-FR': 'En cours'
  },
  'status.done': {
    'pt-BR': 'Concluído',
    'en-US': 'Done',
    'es-ES': 'Completado',
    'fr-FR': 'Terminé'
  },

  // Modal período personalizado
  'modal.periodoPersonalizado': {
    'pt-BR': 'Adicionar rotina com período personalizado',
    'en-US': 'Add routine with custom period',
    'es-ES': 'Agregar rutina con período personalizado',
    'fr-FR': 'Ajouter une routine avec période personnalisée'
  },
  'modal.tipoPeriodo': {
    'pt-BR': 'Tipo de período',
    'en-US': 'Period type',
    'es-ES': 'Tipo de período',
    'fr-FR': 'Type de période'
  },
  'modal.periodo': {
    'pt-BR': 'Período (início e fim)',
    'en-US': 'Range (start and end)',
    'es-ES': 'Período (inicio y fin)',
    'fr-FR': 'Période (début et fin)'
  },
  'modal.diasEspecificos': {
    'pt-BR': 'Dias específicos',
    'en-US': 'Specific days',
    'es-ES': 'Días específicos',
    'fr-FR': 'Jours spécifiques'
  },
  'modal.recorrente': {
    'pt-BR': 'Recorrente (semanal/mensal)',
    'en-US': 'Recurring (weekly/monthly)',
    'es-ES': 'Recurrente (semanal/mensual)',
    'fr-FR': 'Récurrent (hebdomadaire/mensuel)'
  },
  'modal.dataInicio': {
    'pt-BR': 'Data de início',
    'en-US': 'Start date',
    'es-ES': 'Fecha de inicio',
    'fr-FR': 'Date de début'
  },
  'modal.dataTermino': {
    'pt-BR': 'Data de término',
    'en-US': 'End date',
    'es-ES': 'Fecha de fin',
    'fr-FR': 'Date de fin'
  },
  'modal.repetirDias': {
    'pt-BR': 'Repetir nos dias da semana',
    'en-US': 'Repeat on weekdays',
    'es-ES': 'Repetir en días de semana',
    'fr-FR': 'Répéter les jours de semaine'
  },
  'modal.selecionarDatas': {
    'pt-BR': 'Selecionar datas',
    'en-US': 'Select dates',
    'es-ES': 'Seleccionar fechas',
    'fr-FR': 'Sélectionner les dates'
  },
  'modal.adicionarData': {
    'pt-BR': '+ Adicionar data',
    'en-US': '+ Add date',
    'es-ES': '+ Añadir fecha',
    'fr-FR': '+ Ajouter date'
  },
  'modal.inicio': {
    'pt-BR': 'Início',
    'en-US': 'Start',
    'es-ES': 'Inicio',
    'fr-FR': 'Début'
  },
  'modal.frequencia': {
    'pt-BR': 'Frequência',
    'en-US': 'Frequency',
    'es-ES': 'Frecuencia',
    'fr-FR': 'Fréquence'
  },
  'modal.repetirCada': {
    'pt-BR': 'Repetir a cada',
    'en-US': 'Repeat every',
    'es-ES': 'Repetir cada',
    'fr-FR': 'Répéter chaque'
  },
  'modal.terminar': {
    'pt-BR': 'Terminar',
    'en-US': 'End',
    'es-ES': 'Terminar',
    'fr-FR': 'Terminer'
  },
  'modal.nunca': {
    'pt-BR': 'Nunca',
    'en-US': 'Never',
    'es-ES': 'Nunca',
    'fr-FR': 'Jamais'
  },
  'modal.aposOcorrencias': {
    'pt-BR': 'Após ocorrências',
    'en-US': 'After occurrences',
    'es-ES': 'Después de ocurrencias',
    'fr-FR': 'Après occurrences'
  },
  'modal.emData': {
    'pt-BR': 'Em data',
    'en-US': 'On date',
    'es-ES': 'En fecha',
    'fr-FR': 'À date'
  },
  'modal.criarRotina': {
    'pt-BR': 'Criar rotina',
    'en-US': 'Create routine',
    'es-ES': 'Crear rutina',
    'fr-FR': 'Créer routine'
  },

  // Dias da semana
  'weekday.dom': {
    'pt-BR': 'Dom',
    'en-US': 'Sun',
    'es-ES': 'Dom',
    'fr-FR': 'Dim'
  },
  'weekday.seg': {
    'pt-BR': 'Seg',
    'en-US': 'Mon',
    'es-ES': 'Lun',
    'fr-FR': 'Lun'
  },
  'weekday.ter': {
    'pt-BR': 'Ter',
    'en-US': 'Tue',
    'es-ES': 'Mar',
    'fr-FR': 'Mar'
  },
  'weekday.qua': {
    'pt-BR': 'Qua',
    'en-US': 'Wed',
    'es-ES': 'Mié',
    'fr-FR': 'Mer'
  },
  'weekday.qui': {
    'pt-BR': 'Qui',
    'en-US': 'Thu',
    'es-ES': 'Jue',
    'fr-FR': 'Jeu'
  },
  'weekday.sex': {
    'pt-BR': 'Sex',
    'en-US': 'Fri',
    'es-ES': 'Vie',
    'fr-FR': 'Ven'
  },
  'weekday.sab': {
    'pt-BR': 'Sáb',
    'en-US': 'Sat',
    'es-ES': 'Sáb',
    'fr-FR': 'Sam'
  },

  // Frequências
  'frequency.daily': {
    'pt-BR': 'Diária',
    'en-US': 'Daily',
    'es-ES': 'Diaria',
    'fr-FR': 'Quotidienne'
  },
  'frequency.weekly': {
    'pt-BR': 'Semanal',
    'en-US': 'Weekly',
    'es-ES': 'Semanal',
    'fr-FR': 'Hebdomadaire'
  },
  'frequency.monthly': {
    'pt-BR': 'Mensal',
    'en-US': 'Monthly',
    'es-ES': 'Mensual',
    'fr-FR': 'Mensuelle'
  },

  // Etiquetas existentes
  'tag.pessoal': {
    'pt-BR': '#pessoal',
    'en-US': '#personal',
    'es-ES': '#personal',
    'fr-FR': '#personnel'
  },
  'tag.trabalho': {
    'pt-BR': '#trabalho',
    'en-US': '#work',
    'es-ES': '#trabajo',
    'fr-FR': '#travail'
  },
  'tag.saude': {
    'pt-BR': '#saúde',
    'en-US': '#health',
    'es-ES': '#salud',
    'fr-FR': '#santé'
  },
  'tag.estudos': {
    'pt-BR': '#estudos',
    'en-US': '#studies',
    'es-ES': '#estudios',
    'fr-FR': '#études'
  },
  'tag.geral': {
    'pt-BR': '#geral',
    'en-US': '#general',
    'es-ES': '#general',
    'fr-FR': '#général'
  },

  // Estados vazios
  'empty.none': {
    'pt-BR': 'Nenhuma rotina encontrada',
    'en-US': 'No routines found',
    'es-ES': 'No se encontraron rutinas',
    'fr-FR': "Aucune routine trouvée"
  },
  'empty.addRoutines': {
    'pt-BR': 'Adicione rotinas para ver os gráficos',
    'en-US': 'Add routines to see charts',
    'es-ES': 'Agregue rutinas para ver gráficos',
    'fr-FR': 'Ajoutez des routines para voir les graphiques'
  },

  // Toasts
  'toast.added': {
    'pt-BR': 'Rotina adicionada com sucesso!',
    'en-US': 'Routine added successfully!',
    'es-ES': '¡Rutina añadida con éxito!',
    'fr-FR': 'Routine ajoutée avec succès !'
  },
  'toast.saved': {
    'pt-BR': 'Foto do perfil atualizada com sucesso!',
    'en-US': 'Profile photo updated successfully!',
    'es-ES': '¡Foto de perfil actualizada con éxito!',
    'fr-FR': 'Photo de profil mise à jour avec succès !'
  },
  'toast.deleted': {
    'pt-BR': 'Rotina excluída com sucesso!',
    'en-US': 'Routine deleted successfully!',
    'es-ES': '¡Rutina eliminada con éxito!',
    'fr-FR': 'Routine supprimée avec succès !'
  },
  'toast.copied': {
    'pt-BR': 'Rotina duplicada com sucesso!',
    'en-US': 'Routine duplicated successfully!',
    'es-ES': '¡Rutina duplicada con éxito!',
    'fr-FR': 'Routine dupliquée avec succès !'
  },
  'toast.requiredTitle': {
    'pt-BR': 'O título é obrigatório!',
    'en-US': 'Title is required!',
    'es-ES': '¡El título es obligatorio!',
    'fr-FR': 'Le titre est obligatoire !'
  },

  // Gráficos
  'chart.weeklyProgress': {
    'pt-BR': 'Progresso Semanal de Tarefas',
    'en-US': 'Weekly Task Progress',
    'es-ES': 'Progreso Semanal de Tareas',
    'fr-FR': "Progression Hebdomadaire des Tâches"
  },
  'chart.timeDistribution': {
    'pt-BR': 'Distribuição do Tempo',
    'en-US': 'Time Distribution',
    'es-ES': 'Distribución del Tiempo',
    'fr-FR': "Répartition du Temps"
  },
  'chart.habitsOverTime': {
    'pt-BR': 'Evolução de Hábitos',
    'en-US': 'Habits Over Time',
    'es-ES': 'Evolución de Hábitos',
    'fr-FR': "Évolution des Habitudes"
  },
  'chart.infoWeekly': {
    'pt-BR': 'Acompanhe sua produtividade ao longo da semana',
    'en-US': 'Track your productivity throughout the week',
    'es-ES': 'Sigue tu productividad durante la semana',
    'fr-FR': 'Suivez votre productivité tout au long de la semaine'
  },
  'chart.infoTime': {
    'pt-BR': 'Veja como você distribui seu tempo entre diferentes atividades',
    'en-US': 'See how you distribute your time between different activities',
    'es-ES': 'Vea cómo distribuye su tempo entre diferentes actividades',
    'fr-FR': 'Voyez comment vous répartissez votre temps entre différentes activités'
  },
  'chart.infoHabits': {
    'pt-BR': 'Monitore a consistência dos seus hábitos ao longo do tempo',
    'en-US': 'Monitor the consistency of your habits over time',
    'es-ES': 'Monitore la consistencia de sus hábitos a lo largo del tiempo',
    'fr-FR': 'Surveillez la cohérence de vos habitudes au fil du temps'
  },

  // Modal nova etiqueta
  'modal.novaEtiqueta': {
    'pt-BR': 'Nova etiqueta',
    'en-US': 'New tag',
    'es-ES': 'Nueva etiqueta',
    'fr-FR': 'Nouvelle étiquette'
  },
  'modal.nomeEtiqueta': {
    'pt-BR': 'Nome da etiqueta',
    'en-US': 'Tag name',
    'es-ES': 'Nombre de etiqueta',
    'fr-FR': 'Nom de l\'étiquette'
  },
  'modal.cor': {
    'pt-BR': 'Cor',
    'en-US': 'Color',
    'es-ES': 'Color',
    'fr-FR': 'Couleur'
  },

  // Calendário
  'calendar.mesAnterior': {
    'pt-BR': 'Mês anterior',
    'en-US': 'Previous month',
    'es-ES': 'Mes anterior',
    'fr-FR': 'Mois précédent'
  },
  'calendar.proximoMes': {
    'pt-BR': 'Próximo mês',
    'en-US': 'Next month',
    'es-ES': 'Próximo mes',
    'fr-FR': 'Mois suivant'
  },

  // Notificações
  'notification.test': {
    'pt-BR': 'Esta é uma notificação de teste do Life Build!',
    'en-US': 'This is a test notification from Life Build!',
    'es-ES': '¡Esta es una notificación de prueba de Life Build!',
    'fr-FR': 'Ceci est une notification de test de Life Build!'
  },
  'notification.reminder': {
    'pt-BR': '⏰ Lembrete: ',
    'en-US': '⏰ Reminder: ',
    'es-ES': '⏰ Recordatorio: ',
    'fr-FR': '⏰ Rappel: '
  },
  'notification.permissionDenied': {
    'pt-BR': 'Permissão para notificações foi negada. Por favor, habilite nas configurações do navegador.',
    'en-US': 'Notification permission was denied. Please enable in browser settings.',
    'es-ES': 'El permiso para notificaciones fue denegado. Por favor, habilite en la configuración del navegador.',
    'fr-FR': "L'autorisation de notification a été refusée. Veuillez l'activer dans les paramètres du navigateur."
  },
  'notification.unsupported': {
    'pt-BR': 'Seu navegador não suporta notificações',
    'en-US': 'Your browser does not support notifications',
    'es-ES': 'Tu navegador no admite notificaciones',
    'fr-FR': 'Votre navigateur ne prend pas en charge les notifications'
  },

  // Meses e dias da semana
  'months': {
    'pt-BR': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julio', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    'en-US': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'es-ES': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    'fr-FR': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  },
  'weekdays': {
    'pt-BR': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'es-ES': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    'fr-FR': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  }

};

/*
   2) ESTADO DA APLICAÇÃO
*/

// Estado global que guarda a informação atual do app (não persistida diretamente)
let state = {
  currentView: 'hoje',          // 'hoje' | 'todasRotinas' | 'calendario' | 'config'
  currentViewMode: 'lista',     // 'lista' | 'quadro' | 'calendario' | 'config'
  selectedTask: null,           // referência ao objeto de tarefa selecionado no painel de detalhes
  currentDate: new Date(),      // data usada pelo calendário (mês/ano)
  showSidebar: true,            // se a sidebar está visível
  routines: [],                 // array de rotinas (será carregado do localStorage)
  tags: [],                     // array de tags
  preferences: {},              // preferências do usuário (tema, mostrar concluídas, etc.)
  profile: {}                   // perfil do usuário
};

// Contador simples para gerar IDs únicos (inicia em 1000 para evitar colisão com IDs de exemplo)
let nextId = 1000;

/*
   3) SELETORES DO DOM
*/

// Guardamos referências a elementos do DOM para evitar querySelector repetido
const DOM = {
  app: document.querySelector('.app'),
  sidebar: document.getElementById('sidebar'),
  btnToggleSidebar: document.getElementById('btnToggleSidebar'),
  btnQuickAdd: document.getElementById('btnQuickAdd'),
  todayDate: document.getElementById('todayDate'),
  nowTime: document.getElementById('nowTime'),
  menuLinks: document.querySelectorAll('.menu-link[data-view]'),
  filterLinks: document.querySelectorAll('.menu-link[data-filter]'),
  tagList: document.getElementById('tagList'),
  btnAddTag: document.getElementById('btnAddTag'),
  viewTitle: document.getElementById('viewTitle'),
  viewHoje: document.getElementById('viewHoje'),
  viewTodasRotinas: document.getElementById('viewTodasRotinas'),
  viewQuadro: document.getElementById('viewQuadro'),
  viewCalendario: document.getElementById('viewCalendario'),
  viewConfig: document.getElementById('viewConfig'),
  viewGraficos: document.getElementById('viewGraficos'),
  taskListToday: document.getElementById('taskListToday'),
  todoList: document.querySelector('[data-col="todo"] .card-list'),
  doingList: document.querySelector('[data-col="doing"] .card-list'),
  doneList: document.querySelector('[data-col="done"] .card-list'),
  detailsPanel: document.getElementById('detailsPanel'),
  detailsClose: document.getElementById('detailsClose'),
  detailsForm: document.getElementById('detailsForm'),
  taskTitle: document.getElementById('taskTitle'),
  taskDesc: document.getElementById('taskDesc'),
  taskDate: document.getElementById('taskDate'),
  taskTime: document.getElementById('taskTime'),
  taskPriority: document.getElementById('taskPriority'),
  taskTag: document.getElementById('taskTag'),
  btnSaveTask: document.getElementById('btnSaveTask'),
  btnDeleteTask: document.getElementById('btnDeleteTask'),
  btnDuplicateTask: document.getElementById('btnDuplicateTask'),
  toastsContainer: document.getElementById('toasts'),
  // Configurações
  btnOpenConfig: document.getElementById('btnOpenConfig'),
  themeToggle: document.getElementById('themeToggle'),
  notificationsToggle: document.getElementById('notificationsToggle'),
  appLanguage: document.getElementById('appLanguage'),
  fontFamily: document.getElementById('fontFamily'),
  fontSize: document.getElementById('fontSize'),
  fontSizeValue: document.getElementById('fontSizeValue'),
  btnSaveSettings: document.getElementById('btnSaveSettings'),
  btnResetSettings: document.getElementById('btnResetSettings'),
  btnEditProfile: document.getElementById('btnEditProfile'),
  displayName: document.getElementById('displayName'),
  userName: document.getElementById('userName'),
  userEmail: document.getElementById('userEmail'),
  showEmail: document.getElementById('showEmail'),
  // Calendário
  calTitle: document.getElementById('calTitle'),
  calendarGrid: document.querySelector('.calendar-grid'),
  calPrev: document.getElementById('calPrev'),
  calNext: document.getElementById('calNext'),
  // Período personalizado
  modalCustomPeriod: document.getElementById('modalCustomPeriod'),
  customPeriodForm: document.getElementById('customPeriodForm'),
  customTitle: document.getElementById('customTitle'),
  customDesc: document.getElementById('customDesc'),
  customStartDate: document.getElementById('customStartDate'),
  customEndDate: document.getElementById('customEndDate'),
  customTime: document.getElementById('customTime'),
  customPriority: document.getElementById('customPriority'),
  customTag: document.getElementById('customTag'),
  periodTypeRadios: document.querySelectorAll('input[name="periodType"]'),
  periodRangeSection: document.getElementById('periodRangeSection'),
  periodSpecificSection: document.getElementById('periodSpecificSection'),
  periodRecurringSection: document.getElementById('periodRecurringSection'),
  addDateBtn: document.getElementById('addDateBtn'),
  specificDatesContainer: document.getElementById('specificDatesContainer'),
  recurringFrequency: document.getElementById('recurringFrequency'),
  recurringInterval: document.getElementById('recurringInterval'),
  intervalUnit: document.getElementById('intervalUnit'),
  recurringEndRadios: document.querySelectorAll('input[name="recurringEnd"]'),
  recurringOccurrences: document.getElementById('recurringOccurrences'),
  recurringEndDate: document.getElementById('recurringEndDate'),
  recurringStartDate: document.getElementById('recurringStartDate')
};

// Templates <template> do HTML (clonamos estes quando precisamos criar elementos)
const templates = {
  taskItem: document.getElementById('tplTaskItem'),
  boardCard: document.getElementById('tplBoardCard'),
  toast: document.getElementById('tplToast')
};

/*
   4) SISTEMA DE TRADUÇÃO
*/

// Obtém idioma atual (padrão pt-BR)
function getLang() {
  return (state.preferences.language || 'pt-BR');
}

// Traduz chave (key) com fallback
function t(key) {
  const lang = getLang();
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry['pt-BR'] || key;
}

// Aplica tradução nos elementos com data-i18n
function applyLanguageToDOM() {
  const lang = getLang();

  // Traduz elementos com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[key] && I18N[key][lang]) {
      el.textContent = I18N[key][lang];
    }
  });

  // Traduz placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[key] && I18N[key][lang]) {
      el.placeholder = I18N[key][lang];
    }
  });

  // Atualiza textos dinâmicos
  updateViewTitle();
  updateDynamicTexts();

  // Atualiza calendário e gráficos
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof initCharts === 'function') initCharts();

  // Atualiza textos específicos que não usam data-i18n
  updateSpecificTexts();
}

function updateDynamicTexts() {
  const lang = getLang();

  // Atualiza botão de nova rotina
  const quickAddBtn = document.getElementById('btnQuickAdd');
  if (quickAddBtn && I18N['button.novaRotina']) {
    quickAddBtn.textContent = I18N['button.novaRotina'][lang];
  }

  // Atualiza botão de nova etiqueta
  const addTagBtn = document.getElementById('btnAddTag');
  if (addTagBtn && I18N['button.novaEtiqueta']) {
    addTagBtn.textContent = I18N['button.novaEtiqueta'][lang];
  }
}

function updateSpecificTexts() {
  const lang = getLang();

  // Atualiza dias da semana no modal de período personalizado
  const weekdayLabels = {
    0: 'weekday.dom', 1: 'weekday.seg', 2: 'weekday.ter',
    3: 'weekday.qua', 4: 'weekday.qui', 5: 'weekday.sex', 6: 'weekday.sab'
  };

  document.querySelectorAll('.weekday-option').forEach((option, index) => {
    const span = option.querySelector('span');
    const key = weekdayLabels[index];
    if (span && key && I18N[key] && I18N[key][lang]) {
      span.textContent = I18N[key][lang];
    }
  });

  // Atualiza opções de frequência
  const frequencyOptions = document.querySelectorAll('#recurringFrequency option');
  if (frequencyOptions.length >= 3) {
    frequencyOptions[0].textContent = I18N['frequency.daily'][lang];
    frequencyOptions[1].textContent = I18N['frequency.weekly'][lang];
    frequencyOptions[2].textContent = I18N['frequency.monthly'][lang];
  }

  // Atualiza opções de prioridade
  updatePriorityOptions();
}

function updatePriorityOptions() {
  const lang = getLang();

  // Atualiza no painel de detalhes
  const priorityOptions = document.querySelectorAll('#taskPriority option');
  if (priorityOptions.length >= 3) {
    priorityOptions[0].textContent = I18N['priority.baixa'][lang];
    priorityOptions[1].textContent = I18N['priority.media'][lang];
    priorityOptions[2].textContent = I18N['priority.alta'][lang];
  }

  // Atualiza no modal personalizado
  const customPriorityOptions = document.querySelectorAll('#customPriority option');
  if (customPriorityOptions.length >= 3) {
    customPriorityOptions[0].textContent = I18N['priority.baixa'][lang];
    customPriorityOptions[1].textContent = I18N['priority.media'][lang];
    customPriorityOptions[2].textContent = I18N['priority.alta'][lang];
  }
}

// Toast multilíngue
function showToastTranslation(key, type = 'info') {
  const msg = t(key);
  showToast(msg, type);
}

// Recarrega a página ao trocar idioma
function changeLanguage(newLang) {
  state.preferences.language = newLang;
  saveData();
  applyLanguageToDOM();
  showToastTranslation('toast.saved', 'success');
}

/*
   5) INICIALIZAÇÃO
*/

// Função de inicialização que configura tudo e renderiza o estado inicial
function init() {
  // Carrega dados do localStorage (ou DEFAULT_DATA)
  loadData();

  // Garante que nextId seja maior que quaisquer IDs existentes (evita colisão)
  state.routines.forEach(t => {
    // tenta extrair número do id (assumindo formato 'tN')
    const match = String(t.id).replace(/^t/, '');
    const idNum = parseInt(match, 10);
    if (!isNaN(idNum) && idNum >= nextId) nextId = idNum + 1;
  });

  // Configura listeners de eventos (interações do usuário)
  setupEventListeners();

  // Configurar troca de foto do perfil
  setupProfilePhotoChange();

  // Carregar foto do perfil salva
  loadProfilePhoto();

  // Configurar notificações
  setupNotifications();
  setupNotificationToggle();

  // Atualiza relógio e agenda de atualização periódica
  updateClock();
  setInterval(updateClock, 60000); // atualiza a hora a cada minuto

  // Inicializa drag & drop do Kanban
  setupDragAndDrop();

  // Carrega configurações
  loadSettings();

  // Aplica traduções
  applyLanguageToDOM();

  // Renderiza etiquetas - IMPORTANTE: Adicionar esta linha
  renderTags();

  // Inicializar gráficos se estiver na view de gráficos
  if (state.currentView === 'graficos') {
    setTimeout(initCharts, 100); // Pequeno delay para garantir que o DOM esteja pronto
  }

  // Renderiza a interface inicial de acordo com a view selecionada
  render();
}

/*
   6) PERSISTÊNCIA (localStorage)
*/

// Carrega os dados salvos no localStorage. Se não existir, usa DEFAULT_DATA
function loadData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Usa fallback para cada parte caso esteja indefinida
      state.routines = parsedData.routines || DEFAULT_DATA.routines;
      state.tags = parsedData.tags || DEFAULT_DATA.tags;
      state.preferences = parsedData.preferences || DEFAULT_DATA.preferences;
      state.profile = parsedData.profile || DEFAULT_DATA.profile;
      state.showSidebar = parsedData.showSidebar !== undefined ? parsedData.showSidebar : true;
    } else {
      // Primeiro uso — carrega os dados padrão
      state.routines = DEFAULT_DATA.routines.slice();
      state.tags = DEFAULT_DATA.tags.slice();
      state.preferences = Object.assign({}, DEFAULT_DATA.preferences);
      state.profile = Object.assign({}, DEFAULT_DATA.profile);
      state.showSidebar = true;
      // Salva imediatamente para criar a chave no localStorage
      saveData();
    }

    // Aplica preferências visuais (tema, sidebar layout)
    if (DOM.app) {
      DOM.app.setAttribute('data-theme', state.preferences.theme || 'light');
      DOM.app.setAttribute('data-layout', state.showSidebar ? 'with-sidebar' : 'without-sidebar');
    }
  } catch (err) {
    // Em caso de erro de parsing, restauramos o padrão para evitar travar a app
    console.error('Erro ao carregar dados do storage:', err);
    state.routines = DEFAULT_DATA.routines.slice();
    state.tags = DEFAULT_DATA.tags.slice();
    state.preferences = Object.assign({}, DEFAULT_DATA.preferences);
    state.profile = Object.assign({}, DEFAULT_DATA.profile);
    saveData();
  }
}

// Salva o estado relevante no localStorage
function saveData() {
  try {
    const dataToSave = {
      routines: state.routines,
      tags: state.tags,
      preferences: state.preferences,
      profile: state.profile,
      showSidebar: state.showSidebar
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    // Se estiver na view de gráficos, atualizar os gráficos
    if (state.currentView === 'graficos') {
      initCharts();
    }
  } catch (err) {
    console.error('Erro ao salvar dados no storage:', err);
  }
}

/*
   7) UTILITÁRIOS (helpers)
*/

// Gera um ID único simples para novas rotinas (prefixo 't' + contador)
function generateId() {
  return 't' + (nextId++);
}

// Mostrar um toast (notificação temporária)
// message: texto, type: 'info'|'success'|'error' (usado apenas para classes)
function showToast(message, type = 'info', duration = 3000) {
  if (!templates.toast || !DOM.toastsContainer) {
    // fallback console se os elementos não existirem
    console.log(`[${type}] ${message}`);
    return;
  }

  // Clona o template do toast
  const toastElement = templates.toast.content.cloneNode(true);
  const toast = toastElement.querySelector('.toast');
  // Insere o conteúdo e a classe de tipo
  toast.querySelector('.toast-content').textContent = message;
  toast.classList.add(type);

  // Adiciona o toast ao container (prepend para mostrar em cima)
  DOM.toastsContainer.prepend(toast);

  // Fecha ao clicar no botão 'close' interno
  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toast.remove());

  // Auto-destrói após 'duration' ms (aplica uma classe para animação, se existir)
  setTimeout(() => {
    toast.classList.add('fade-out');
    // remove depois da transição (evita remoção imediata cortando animação)
    toast.addEventListener('transitionend', () => {
      try { toast.remove(); } catch (e) { }
    });
  }, duration);
}

// Converte um objeto Date em string 'YYYY-MM-DD' para inputs do tipo date
function formatDateForInput(date) {
  if (!date) return '';
  // Se for string já no formato ISO, tenta apenas retornar a parte de data
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date.split('T')[0];
  }
  // Se for Date
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return '';
}

// Normaliza string de tag removendo '#' e espaços
function normalizeTag(tagStr) {
  if (!tagStr) return undefined;
  return tagStr.replace('#', '').trim();
}

/*
   8) CRUD DE ROTINAS (Add / Toggle / Open / Save / Delete / Duplicate)
*/

// Adiciona uma nova rotina ao estado e salva
function addNewRoutine({ title, description, date, time, priority, tag, status = 'todo', completed = false }) {
  // Validação mínima
  if (!title || !title.trim()) {
    showToastTranslation('toast.requiredTitle', 'error');
    return null;
  }

  // Normalizar etiqueta e verificar se existe
  let normalizedTag = tag ? normalizeTag(tag) : undefined;
  if (normalizedTag && !getTagByName(normalizedTag)) {
    // Se a etiqueta não existe, criar automaticamente
    addNewTag({
      name: normalizedTag,
      color: '#888' // Cor padrão
    });
  }

  const newRoutine = {
    id: generateId(),
    title: title.trim(),
    description: description || '',
    date: date || undefined,
    time: time || undefined,
    priority: priority || 'medium',
    tag: normalizedTag,
    status: status,
    completed: !!completed
  };

  state.routines.push(newRoutine);
  saveData();
  render();
  showToastTranslation('toast.added', 'success');
  
  // Verificar se deve enviar notificação
  if (date && state.preferences.notifications) {
    setTimeout(() => sendReminderNotification(newRoutine), 1000);
  }
  
  return newRoutine;
}

// Alterna marcação de concluída/pendente para uma rotina pelo ID
function toggleTaskCompletion(taskId) {
  const task = state.routines.find(t => t.id === taskId);
  if (!task) return;

  // Inverte o booleano completed
  task.completed = !task.completed;

  // Ajuste do status se necessário
  if (task.completed) {
    task.status = 'done';
    showToast(`Rotina "${task.title}" concluída!`, 'success');
  } else {
    // se estava 'done' e foi desmarcada, movemos para 'todo' por padrão
    if (task.status === 'done') task.status = 'todo';
    showToast(`Rotina "${task.title}" marcada como pendente.`, 'info');
  }

  saveData();
  render();
}

// Abre painel de detalhes com o conteúdo da tarefa
function openTaskDetails(taskId) {
  const task = state.routines.find(t => t.id === taskId);
  if (!task || !DOM.detailsPanel) return;

  state.selectedTask = task;

  // Preenche o formulário com os dados da tarefa
  if (DOM.taskTitle) DOM.taskTitle.value = task.title || '';
  if (DOM.taskDesc) DOM.taskDesc.value = task.description || '';
  if (DOM.taskPriority) DOM.taskPriority.value = task.priority || 'medium';
  if (DOM.taskTag) DOM.taskTag.value = task.tag ? `#${task.tag}` : '';

  // Ajuste de data para input evitando problemas de timezone
  if (task.date) {
    // cria um objeto Date a partir do string 'YYYY-MM-DD'
    const d = new Date(task.date + 'T00:00:00');
    DOM.taskDate.value = formatDateForInput(d);
  } else {
    if (DOM.taskDate) DOM.taskDate.value = '';
  }

  if (DOM.taskTime) DOM.taskTime.value = task.time || '';

  // Atualiza título do painel
  const detailsTitle = document.getElementById('detailsTitle');
  if (detailsTitle) detailsTitle.textContent = task.title;

  // Exibe painel de detalhes (aria-hidden e classes para animação)
  DOM.detailsPanel.setAttribute('aria-hidden', 'false');
  DOM.detailsPanel.classList.add('is-open');
}

// Fecha painel de detalhes e limpa seleção
function closeDetails() {
  state.selectedTask = null;
  if (!DOM.detailsPanel) return;
  DOM.detailsPanel.setAttribute('aria-hidden', 'true');
  DOM.detailsPanel.classList.remove('is-open');
  // Reseta o formulário visualmente (não altera dados não salvos)
  if (DOM.detailsForm) DOM.detailsForm.reset();
}

// Salva as alterações feitas no painel de detalhes
function saveTaskDetails(e) {
  // This function intended to be attached to detailsForm submit
  if (e && e.preventDefault) e.preventDefault();
  if (!state.selectedTask) return;

  // Recupera os valores do formulário
  const title = DOM.taskTitle ? DOM.taskTitle.value.trim() : '';
  const description = DOM.taskDesc ? DOM.taskDesc.value : '';
  const date = DOM.taskDate ? DOM.taskDate.value || undefined : undefined;
  const time = DOM.taskTime ? DOM.taskTime.value || undefined : undefined;
  const priority = DOM.taskPriority ? DOM.taskPriority.value : 'medium';
  const tag = DOM.taskTag ? normalizeTag(DOM.taskTag.value) : undefined;

  if (!title) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Atualiza o objeto no estado
  const task = state.selectedTask;
  task.title = title;
  task.description = description;
  task.date = date;
  task.time = time;
  task.priority = priority;
  task.tag = tag;

  // Persistência e re-render
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.saved', 'success');
}

// Exclui a tarefa selecionada
function deleteCurrentTask() {
  if (!state.selectedTask) return;

  const confirmed = confirm(`Deseja realmente excluir a rotina "${state.selectedTask.title}"?`);
  if (!confirmed) return;

  state.routines = state.routines.filter(t => t.id !== state.selectedTask.id);
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.deleted', 'info');
}

// Duplica a tarefa selecionada
function duplicateCurrentTask() {
  if (!state.selectedTask) return;

  const original = state.selectedTask;
  const copy = Object.assign({}, original, {
    id: generateId(),
    title: `Cópia de ${original.title}`,
    completed: false,
    status: 'todo'
  });

  state.routines.push(copy);
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.copied', 'success');
}

/*
   9) GESTÃO DE ETIQUETAS (TAGS)
*/

// Função para abrir o modal de nova etiqueta
function openAddTagModal() {
  const modal = document.getElementById('modalAddTag');
  if (!modal) return;

  // Limpar formulário
  const form = document.getElementById('addTagForm');
  if (form) form.reset();

  // Definir cor padrão
  const colorInput = document.getElementById('tagColor');
  if (colorInput) colorInput.value = '#4f46e5';

  // Focar no campo de nome
  const nameInput = document.getElementById('tagName');
  if (nameInput) nameInput.focus();

  // Abrir modal
  if (modal.showModal) {
    modal.showModal();
  }
}

// Função para processar o formulário de nova etiqueta
function processAddTagForm(e) {
  if (e && e.preventDefault) e.preventDefault();

  // Verificar se é o botão cancelar
  const submitter = e.submitter;
  if (submitter && submitter.value === 'cancel') {
    closeAddTagModal();
    return;
  }

  // Coletar dados do formulário
  const nameInput = document.getElementById('tagName');
  const colorInput = document.getElementById('tagColor');

  if (!nameInput || !colorInput) return;

  const name = nameInput.value.trim();
  const color = colorInput.value;

  // Validação
  if (!name) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Adicionar etiqueta
  addNewTag({ name, color });

  // Fechar modal
  closeAddTagModal();
}

// Função para fechar o modal de etiqueta
function closeAddTagModal() {
  const modal = document.getElementById('modalAddTag');
  if (!modal) return;

  // Limpar formulário
  const form = document.getElementById('addTagForm');
  if (form) form.reset();

  // Fechar modal
  if (modal.close) modal.close();
}

// Adiciona nova etiqueta ao estado (verifica duplicidade por nome)
function addNewTag({ name, color }) {
  if (!name || !name.trim()) {
    showToast('O nome da etiqueta é obrigatório.', 'error');
    return null;
  }

  const normalized = name.trim().toLowerCase();

  // Verificar se já existe (case insensitive)
  if (state.tags.some(t => t.name.toLowerCase() === normalized)) {
    showToast('Esta etiqueta já existe!', 'error');
    return null;
  }

  const newTag = {
    id: `tag${Date.now()}`, // ID único baseado no timestamp
    name: normalized,
    color: color || '#888'
  };

  state.tags.push(newTag);
  saveData();
  renderTags();

  const lang = getLang();
  const successMessages = {
    'pt-BR': `Etiqueta #${newTag.name} adicionada!`,
    'en-US': `Tag #${newTag.name} added!`,
    'es-ES': `¡Etiqueta #${newTag.name} añadida!`,
    'fr-FR': `Étiquette #${newTag.name} ajoutée !`
  };

  showToast(successMessages[lang] || successMessages['pt-BR'], 'success');
  return newTag;
}

// Renderiza as tags na sidebar e no datalist do formulário
function renderTags() {
  if (!DOM.tagList) return;

  // Limpar lista atual
  DOM.tagList.innerHTML = '';

  // Atualizar datalist para sugestões
  const datalist = document.getElementById('datalistTags');
  if (datalist) {
    datalist.innerHTML = '';

    state.tags.forEach(tag => {
      const option = document.createElement('option');
      option.value = `#${tag.name}`;
      datalist.appendChild(option);
    });
  }

  // Se não houver etiquetas, mostrar mensagem
  if (state.tags.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.className = 'empty-state';
    emptyMsg.textContent = 'Nenhuma etiqueta criada';
    emptyMsg.style.padding = '8px';
    emptyMsg.style.color = 'var(--color-text-secondary)';
    emptyMsg.style.fontStyle = 'italic';
    DOM.tagList.appendChild(emptyMsg);
    return;
  }

  // Renderizar cada etiqueta
  state.tags.forEach(tag => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'tag';
    a.href = '#';
    a.dataset.tag = tag.name;
    a.textContent = `#${tag.name}`;

    // Aplicar cor da etiqueta
    a.style.borderColor = tag.color;
    a.style.color = tag.color;
    a.style.backgroundColor = tag.color + '20'; // Adiciona transparência

    // Evento de clique para filtrar por etiqueta
    a.addEventListener('click', (e) => {
      e.preventDefault();
      filterByTag(tag.name);
    });

    li.appendChild(a);
    DOM.tagList.appendChild(li);
  });
}

// Função para filtrar por etiqueta
function filterByTag(tagName) {
  // Limpar filtros ativos
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
  }

  // Filtrar tarefas pela etiqueta
  const filteredTasks = state.routines.filter(routine =>
    routine.tag && routine.tag.toLowerCase() === tagName.toLowerCase()
  );

  // Renderizar lista filtrada
  renderTaskListWithTasks(filteredTasks);

  const lang = getLang();
  const filterMessages = {
    'pt-BR': `Filtrado por #${tagName}`,
    'en-US': `Filtered by #${tagName}`,
    'es-ES': `Filtrado por #${tagName}`,
    'fr-FR': `Filtré par #${tagName}`
  };

  showToast(filterMessages[lang] || filterMessages['pt-BR'], 'info');
}

// Função para obter etiqueta por nome
function getTagByName(tagName) {
  return state.tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
}

/* 
   10) FILTRAGEM E LISTAGEM DE TAREFAS
*/

// Retorna um array de tarefas filtradas de acordo com a view atual e filtros rápidos
function getFilteredTasks() {
  // Começa com uma cópia de todas as tasks
  let tasks = state.routines.slice();

  // Constroi data de referência para hoje (00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtra conforme state.currentView
  switch (state.currentView) {
    case 'hoje':
      tasks = tasks.filter(task => {
        if (!task.date) return false;
        const td = new Date(task.date + 'T00:00:00');
        td.setHours(0, 0, 0, 0);
        return td.getTime() === today.getTime();
      });
      break;
    case 'todasRotinas':
      // sem filtro por data
      break;
    case 'calendario':
      // Apenas tarefas com data aparecem no calendário
      tasks = tasks.filter(task => task.date);
      break;
    default:
      break;
  }

  // Filtros rápidos ativos na sidebar (um por vez)
  const activeFilterLink = document.querySelector('.menu-link[data-filter].is-active');
  if (activeFilterLink) {
    const filter = activeFilterLink.dataset.filter;
    switch (filter) {
      case 'pendentes':
        tasks = tasks.filter(t => !t.completed);
        break;
      case 'concluidas':
        tasks = tasks.filter(t => t.completed);
        break;
      case 'alta':
        tasks = tasks.filter(t => t.priority === 'high');
        break;
      case 'media':
        tasks = tasks.filter(t => t.priority === 'medium');
        break;
      case 'baixa':
        tasks = tasks.filter(t => t.priority === 'low');
        break;
      case 'semData':
        tasks = tasks.filter(t => !t.date);
        break;
      default:
        break;
    }
  } else {
    // Se não houver filtro ativo, aplica preferência global de mostrar ou não concluídas
    if (!state.preferences.showCompleted) {
      tasks = tasks.filter(t => !t.completed);
    }
  }

  return tasks;
}

/*
   11) RENDERIZAÇÃO (Lista / Quadro / Calendário / Config)
*/

// Atualiza título da view (ex.: Hoje, Calendário)
function updateViewTitle() {
  const titles = {
    'hoje': t('view.hoje'),
    'todasRotinas': t('view.todasRotinas'),
    'calendario': t('view.calendario'),
    'config': t('view.config'),
    'graficos': t('view.graficos')
  };
  if (DOM.viewTitle) DOM.viewTitle.textContent = titles[state.currentView] || 'Rotinas';
}

// Renderiza a lista principal (usada no modo 'lista')
function renderTaskList() {
  // Decide qual container usar dependendo da view ativa.
  // Por padrão tentamos usar a .task-list dentro da view ativa.
  let targetList = null;
  const activeViewId = `view${state.currentView.charAt(0).toUpperCase()}${state.currentView.slice(1)}`; // ex: 'todasRotinas' -> 'viewTodasRotinas'
  const activeView = document.getElementById(activeViewId);
  if (activeView) {
    targetList = activeView.querySelector('.task-list');
  }
  // fallback para o container padrão (hoje)
  if (!targetList) targetList = DOM.taskListToday;
  if (!targetList) return;
  targetList.innerHTML = '';
  const tasks = getFilteredTasks();
  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t('empty.none');
    targetList.appendChild(empty);
    return;
  }
  tasks.forEach(task => targetList.appendChild(createTaskElement(task)));
}

// Renderiza lista específica (usada quando filtramos por tag, por exemplo)
function renderTaskListWithTasks(tasks) {
  // Reusa a lógica de escolher o container correto (view-aware)
  let targetList = null;
  const activeViewId = `view${state.currentView.charAt(0).toUpperCase()}${state.currentView.slice(1)}`;
  const activeView = document.getElementById(activeViewId);
  if (activeView) targetList = activeView.querySelector('.task-list');
  if (!targetList) targetList = DOM.taskListToday;
  if (!targetList) return;
  targetList.innerHTML = '';

  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t('empty.none');
    DOM.taskListToday.appendChild(empty);
    return;
  }
  tasks.forEach(task => {
    const el = createTaskElement(task);
    DOM.taskListToday.appendChild(el);
  });
}

// Render principal que decide qual modo desenhar
function render() {
  updateViewTitle();
  renderTags(); // garante que as tags estejam atualizadas

  // Oculta todas as views primeiro
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('is-active'));

  // Mostra a view ativa baseada no currentView
  switch (state.currentView) {
    case 'hoje':
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
      break;
    case 'todasRotinas':
      if (DOM.viewTodasRotinas) DOM.viewTodasRotinas.classList.add('is-active');
      renderTaskList();
      break;
    case 'calendario':
      if (DOM.viewCalendario) DOM.viewCalendario.classList.add('is-active');
      renderCalendar();
      break;
    case 'config':
      if (DOM.viewConfig) DOM.viewConfig.classList.add('is-active');
      renderProfile();
      break;
    case 'graficos':
      if (DOM.viewGraficos) DOM.viewGraficos.classList.add('is-active');
      initCharts(); // ← INICIALIZAR GRÁFICOS AQUI
      break;
    default:
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
  }
}

/*
  11.1) Render - Quadro Kanban
*/

// Renderiza o quadro Kanban preenchendo as colunas por status
function renderBoard() {
  if (!DOM.todoList || !DOM.doingList || !DOM.doneList) return;
  DOM.todoList.innerHTML = '';
  DOM.doingList.innerHTML = '';
  DOM.doneList.innerHTML = '';

  // Usa getFilteredTasks para respeitar filtros
  const tasks = getFilteredTasks();

  // Para cada tarefa, cria um card e o coloca na coluna correta
  tasks.forEach(task => {
    const card = createBoardCard(task);
    if (task.status === 'done') DOM.doneList.appendChild(card);
    else if (task.status === 'doing') DOM.doingList.appendChild(card);
    else DOM.todoList.appendChild(card);
  });

  // Atualiza contadores (se existirem no DOM)
  const todoCount = document.getElementById('todoCount');
  const doingCount = document.getElementById('doingCount');
  const doneCount = document.getElementById('doneCount');
  if (todoCount) todoCount.textContent = `${DOM.todoList.children.length} itens`;
  if (doingCount) doingCount.textContent = `${DOM.doingList.children.length} itens`;
  if (doneCount) doneCount.textContent = `${DOM.doneList.children.length} itens`;
}

/*
  11.2) Render - Calendário
*/

// Renderiza o calendário do mês atual (state.currentDate)
function renderCalendar() {
  if (!DOM.calendarGrid || !DOM.calTitle) return;

  // Limpa grid
  DOM.calendarGrid.innerHTML = '';

  // Ano e mês atuais
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  // Nome do mês (em PT-BR)
  const lang = getLang();
  const monthNames = I18N.months[lang];
  DOM.calTitle.textContent = `${monthNames[month]} ${year}`;

  // Determina primeiro dia da semana do mês e quantidade de dias
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Cabeçalho (dias da semana)
  const dayNames = I18N.weekdays[lang];
  dayNames.forEach(d => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = d;
    DOM.calendarGrid.appendChild(header);
  });

  // Dias do mês anterior (preenchimento)
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const dayEl = createCalendarDay(prevMonthDays - i, true);
    DOM.calendarGrid.appendChild(dayEl);
  }

  // Dias do mês atual
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year);
    const fullDate = new Date(year, month, d);
    const dayEl = createCalendarDay(d, false, isToday, fullDate);
    DOM.calendarGrid.appendChild(dayEl);
  }

  // Preenchimento do próximo mês para completar 6 linhas (42 células)
  const totalCells = 42;
  const daysSoFar = firstDayOfMonth + daysInMonth;
  const nextMonthDays = totalCells - daysSoFar;
  for (let i = 1; i <= nextMonthDays; i++) {
    const dayEl = createCalendarDay(i, true);
    DOM.calendarGrid.appendChild(dayEl);
  }
}

/* Cria um elemento de dia para o calendário
   day: número do dia
   isOtherMonth: boolean, se o dia pertence a outro mês (visualmente diferenciado)
   isToday: boolean
   fullDate: Date (opcional) - se fornecido, busca eventos para esse dia
*/
function createCalendarDay(day, isOtherMonth, isToday = false, fullDate = null) {
  const cell = document.createElement('div');
  cell.className = 'calendar-day';
  if (isOtherMonth) cell.classList.add('other-month');
  if (isToday) cell.classList.add('today');

  // Número do dia
  const number = document.createElement('div');
  number.className = 'calendar-day-number';
  number.textContent = day;
  cell.appendChild(number);

  // Se fullDate é passado, queremos também colocar eventos desse dia
  if (fullDate) {
    // Busca tarefas cuja data corresponde ao fullDate
    const tasksForDay = state.routines.filter(task => {
      if (!task.date) return false;
      // Normaliza para midnight local
      const taskDate = new Date(task.date + 'T00:00:00');
      return taskDate.getDate() === fullDate.getDate()
        && taskDate.getMonth() === fullDate.getMonth()
        && taskDate.getFullYear() === fullDate.getFullYear();
    });

    // Para cada tarefa, adiciona um botão/evento no dia
    tasksForDay.forEach(task => {
      const ev = document.createElement('button');
      ev.className = `calendar-event priority-${task.priority || 'medium'}`;
      // Adicionar classe se a tarefa faz parte de uma rotina com múltiplas datas
      if (task.isRecurring || task.parentRoutineId) {
        ev.classList.add('has-multiple-dates');
      }
      // Pode truncar o título se for muito grande (ex.: 30 chars)
      ev.textContent = task.title.length > 30 ? task.title.slice(0, 27) + '...' : task.title;
      // Ao clicar no evento, abre detalhes
      ev.addEventListener('click', (e) => {
        e.stopPropagation(); // evita que o clique dispare outras ações
        openTaskDetails(task.id);
      });
      cell.appendChild(ev);
    });

    // Ao clicar no dia (fora de eventos), abre modal de período personalizado com a data preenchida
    cell.addEventListener('click', (e) => {
      // Se o clique for num evento, já tratamos acima
      if (e.target && e.target.matches('.calendar-event')) return;
      if (!DOM.modalCustomPeriod) return;
      const dateStr = formatDateForInput(fullDate);
      if (DOM.customStartDate) DOM.customStartDate.value = dateStr;
      if (DOM.customEndDate) DOM.customEndDate.value = dateStr;
      if (DOM.recurringStartDate) DOM.recurringStartDate.value = dateStr;
      openCustomPeriodModal();
    });
  }

  return cell;
}

/*
  12) CRIAÇÃO DE ELEMENTOS (task item e board card)
*/

// Cria e retorna um elemento li.populado para a lista usando o template tplTaskItem
function createTaskElement(task) {
  if (!templates.taskItem) {
    // fallback simples
    const li = document.createElement('li');
    li.textContent = task.title;
    return li;
  }

  // Clona o template
  const clone = templates.taskItem.content.cloneNode(true);
  const li = clone.querySelector('li');
  // Marca ID no dataset para referência
  li.dataset.taskId = task.id;
  // Adiciona classe visual se concluída
  if (task.completed) li.classList.add('is-completed');
  // Adicionar classe se a tarefa faz parte de uma rotina com múltiplas datas
  if (task.isRecurring || task.parentRoutineId) {
    li.classList.add('has-multiple-dates');
  }

  // Checkbox para concluir/toggle
  const checkbox = clone.querySelector('.checkbox input');
  if (checkbox) {
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
  }

  // Título
  const titleEl = clone.querySelector('.task-title');
  if (titleEl) titleEl.textContent = task.title || '';

  // Due / data
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString(getLang());
      // marca atraso se não concluída e data passada
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = t('filter.semData');
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority'; // reset classes
    const priorityText = {
      'high': t('filter.alta'),
      'medium': t('filter.media'),
      'low': t('filter.baixa')
    };
    prioEl.textContent = priorityText[task.priority] || t('filter.media');
    prioEl.classList.add(task.priority || 'medium'); // adiciona classe 'high'|'medium'|'low' para estilo
  }

  // Tag
  const tagEl = clone.querySelector('.tag');
  if (tagEl) {
    if (task.tag) {
      tagEl.textContent = `#${task.tag}`;
      const tagInfo = state.tags.find(t => t.name === task.tag);
      if (tagInfo) {
        // define cor de fundo levemente translúcida e cor do texto
        tagEl.style.backgroundColor = tagInfo.color + '20'; // adiciona transparência simples
        tagEl.style.color = tagInfo.color;
      }
    } else {
      tagEl.textContent = '#geral';
    }
  }

  // Botão abrir detalhes
  const openBtn = clone.querySelector('.task-open');
  if (openBtn) openBtn.addEventListener('click', () => openTaskDetails(task.id));

  // Drag start (para Kanban)
  li.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  // Retorna o fragmento (elemento li)
  return clone;
}

// Cria e retorna um card para o quadro a partir do template tplBoardCard
function createBoardCard(task) {
  if (!templates.boardCard) {
    const div = document.createElement('div');
    div.textContent = task.title;
    return div;
  }

  const clone = templates.boardCard.content.cloneNode(true);
  const card = clone.querySelector('.card');
  card.dataset.taskId = task.id;
  card.draggable = true;
  if (task.completed) card.classList.add('is-completed');
  // Adicionar classe se a tarefa faz parte de uma rotina com múltiplas datas
  if (task.isRecurring || task.parentRoutineId) {
    card.classList.add('has-multiple-dates');
  }

  // Título
  const title = clone.querySelector('.card-title');
  if (title) title.textContent = task.title;

  // Due date
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString(getLang());
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = t('filter.semData');
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority';
    const priorityText = {
      'high': t('filter.alta'),
      'medium': t('filter.media'),
      'low': t('filter.baixa')
    };
    prioEl.textContent = priorityText[task.priority] || t('filter.media');
    prioEl.classList.add(task.priority || 'medium');
  }

  // Tag
  const tagEl = clone.querySelector('.tag');
  if (tagEl) {
    if (task.tag) {
      tagEl.textContent = `#${task.tag}`;
      const tagInfo = state.tags.find(t => t.name === task.tag);
      if (tagInfo) {
        tagEl.style.backgroundColor = tagInfo.color + '20';
        tagEl.style.color = tagInfo.color;
      }
    } else {
      tagEl.textContent = '#geral';
    }
  }

  // Status visual
  const statusEl = clone.querySelector('.status');
  if (statusEl) {
    if (task.status === 'done') statusEl.style.backgroundColor = '#10b981';
    else if (task.status === 'doing') statusEl.style.backgroundColor = '#f59e0b';
    else statusEl.style.backgroundColor = '#e5e7eb';
  }

  // Ações (detalhes e concluir/desfazer)
  const actionButtons = clone.querySelectorAll('.card-actions button');
  if (actionButtons.length >= 2) {
    actionButtons[0].addEventListener('click', () => openTaskDetails(task.id)); // Detalhes
    // Botão concluir / desfazer
    actionButtons[1].textContent = task.completed ? t('button.desfazer') : t('button.concluir');
    actionButtons[1].addEventListener('click', () => toggleTaskCompletion(task.id));
  }

  // Drag start
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  return clone;
}

/*
  13) DRAG & DROP (Kanban)
*/

// Configura eventos de drag & drop nas colunas
function setupDragAndDrop() {
  // Seleciona colunas .column
  const columns = document.querySelectorAll('.column');
  if (!columns || columns.length === 0) return;

  columns.forEach(col => {
    // Quando um item é arrastado por cima de uma coluna
    col.addEventListener('dragenter', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragover', (e) => {
      e.preventDefault(); // necessário para permitir drop
    });
    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });
    // Evento drop final que move a tarefa entre status
    col.addEventListener('drop', handleDrop);
  });

  // Garante que o documento permita drops (evita abrir arquivos arrastados)
  document.addEventListener('dragover', (e) => { e.preventDefault(); });
}

// Handler quando um item é dropado em uma coluna
function handleDrop(e) {
  e.preventDefault();
  const col = e.currentTarget;
  col.classList.remove('drag-over');

  // Recupera o taskId do dataTransfer
  const taskId = e.dataTransfer.getData('text/plain');
  if (!taskId) return;

  const newStatus = col.dataset.col; // espera 'todo' | 'doing' | 'done'
  const task = state.routines.find(t => t.id === taskId);
  if (!task) return;

  // Atualiza status e completed de acordo
  task.status = newStatus || 'todo';
  task.completed = newStatus === 'done';

  // Persistência e render
  saveData();
  render(); // chama render (ou renderBoard para menor custo)

  const statusText = {
    'todo': 'A fazer',
    'doing': 'Em progresso',
    'done': 'Concluído'
  };
  showToast(`Rotina movida para: ${statusText[newStatus] || 'A fazer'}`, 'info');
}

/*
  14) CONFIGURAÇÕES E PREFERÊNCIAS
*/

// Carrega as configurações salvas
function loadSettings() {
  if (state.preferences) {
    // Tema
    if (state.preferences.theme) {
      DOM.app.setAttribute('data-theme', state.preferences.theme);
      if (DOM.themeToggle) DOM.themeToggle.checked = state.preferences.theme === 'dark';
    }

    // Notificações
    if (DOM.notificationsToggle && state.preferences.notifications !== undefined) {
      DOM.notificationsToggle.checked = state.preferences.notifications;
    }

    // Idioma
    if (DOM.appLanguage && state.preferences.language) {
      DOM.appLanguage.value = state.preferences.language;
    }

    // Fonte
    if (DOM.fontFamily && state.preferences.fontFamily) {
      DOM.fontFamily.value = state.preferences.fontFamily;
      document.body.style.fontFamily = state.preferences.fontFamily;
    }

    // Tamanho da fonte
    if (DOM.fontSize && state.preferences.fontSize) {
      DOM.fontSize.value = state.preferences.fontSize;
      if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = state.preferences.fontSize + 'px';
      document.body.style.fontSize = state.preferences.fontSize + 'px';
    }
  }

  // Carregar foto do perfil
  loadProfilePhoto();
}

// Salva as configurações
function saveSettings() {
  state.preferences = {
    theme: DOM.themeToggle && DOM.themeToggle.checked ? 'dark' : 'light',
    notifications: DOM.notificationsToggle ? DOM.notificationsToggle.checked : false,
    language: DOM.appLanguage ? DOM.appLanguage.value : 'pt-BR',
    fontFamily: DOM.fontFamily ? DOM.fontFamily.value : 'Inter',
    fontSize: DOM.fontSize ? DOM.fontSize.value : '16',
    showCompleted: state.preferences.showCompleted !== undefined ? state.preferences.showCompleted : true
  };

  // Se as notificações estão sendo ativadas, solicitar permissão
  if (state.preferences.notifications) {
    requestNotificationPermission().then(permissionGranted => {
      if (!permissionGranted) {
        state.preferences.notifications = false;
        if (DOM.notificationsToggle) {
          DOM.notificationsToggle.checked = false;
        }
        saveData();
      } else {
        // Enviar notificação de teste quando ativadas
        setTimeout(sendTestNotification, 1000);
      }
    });
  }

  // Garantir que a foto do perfil seja preservada
  if (state.profile && state.profile.photo) {
    state.preferences.profilePhoto = state.profile.photo;
  }

  // Aplica as configurações
  DOM.app.setAttribute('data-theme', state.preferences.theme);
  if (DOM.fontFamily) document.body.style.fontFamily = state.preferences.fontFamily;
  if (DOM.fontSize) {
    document.body.style.fontSize = state.preferences.fontSize + 'px';
    if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = state.preferences.fontSize + 'px';
  }

  saveData();
  showToastTranslation('toast.saved', 'success');
}

// Restaura configurações padrão
function resetSettings() {
  const confirmed = confirm('Deseja restaurar as configurações padrão?');
  if (!confirmed) return;

  state.preferences = {
    theme: 'light',
    notifications: false,
    language: 'pt-BR',
    fontFamily: 'Inter',
    fontSize: '16',
    showCompleted: true
  };

  loadSettings();
  saveData();
  applyLanguageToDOM();
  showToastTranslation('toast.saved', 'info');
}

// Alterna o tema
function toggleTheme() {
  const newTheme = DOM.themeToggle.checked ? 'dark' : 'light';
  DOM.app.setAttribute('data-theme', newTheme);
  state.preferences.theme = newTheme;
  saveData();
}

// Renderiza o perfil do usuário
function renderProfile() {
  if (DOM.displayName && state.profile.displayName) {
    DOM.displayName.textContent = state.profile.displayName;
  }
  if (DOM.userName && state.profile.userName) {
    DOM.userName.textContent = state.profile.userName;
  }
  if (DOM.userEmail && state.profile.email) {
    DOM.userEmail.textContent = state.profile.email;
  }
}

/*
  15) SISTEMA DE PERÍODO PERSONALIZADO - VERSÃO CORRIGIDA
*/

// Abrir modal de período personalizado - VERSÃO CORRIGIDA
function openCustomPeriodModal() {
  if (!DOM.modalCustomPeriod) return;

  // Definir data mínima como hoje
  const today = new Date().toISOString().split('T')[0];
  if (DOM.customStartDate) DOM.customStartDate.min = today;
  if (DOM.customEndDate) DOM.customEndDate.min = today;
  if (DOM.recurringStartDate) DOM.recurringStartDate.min = today;
  if (DOM.recurringEndDate) DOM.recurringEndDate.min = today;

  // Limpar formulário
  DOM.customPeriodForm.reset();

  // Inicializar valores padrão
  if (DOM.customStartDate) DOM.customStartDate.value = today;
  if (DOM.customEndDate) DOM.customEndDate.value = today;
  if (DOM.recurringStartDate) DOM.recurringStartDate.value = today;
  
  // Inicializar dias da semana (segunda a sexta selecionados por padrão)
  const weekdayCheckboxes = document.querySelectorAll('.weekday-option input[type="checkbox"]');
  weekdayCheckboxes.forEach((checkbox, index) => {
    checkbox.checked = index >= 1 && index <= 5; // Segunda a sexta
  });

  // Mostrar seção padrão (intervalo)
  showPeriodSection('range');

  // Inicializar estados dos campos
  updateIntervalUnit();
  toggleRecurringEndFields();

  // Abrir modal
  if (DOM.modalCustomPeriod.showModal) DOM.modalCustomPeriod.showModal();
  if (DOM.customTitle) DOM.customTitle.focus();
}

// Função para fechar o modal de período personalizado
function closeCustomPeriodModal() {
  if (!DOM.modalCustomPeriod) return;

  // Limpar formulário
  if (DOM.customPeriodForm) DOM.customPeriodForm.reset();

  // Limpar campos de datas específicas
  if (DOM.specificDatesContainer) {
    DOM.specificDatesContainer.innerHTML = '';
  }

  // Fechar modal
  if (DOM.modalCustomPeriod.close) DOM.modalCustomPeriod.close();
}

// Mostrar seção específica baseada no tipo de período selecionado - VERSÃO CORRIGIDA
function showPeriodSection(type) {
  // Esconder todas as seções
  if (DOM.periodRangeSection) DOM.periodRangeSection.style.display = 'none';
  if (DOM.periodSpecificSection) DOM.periodSpecificSection.style.display = 'none';
  if (DOM.periodRecurringSection) DOM.periodRecurringSection.style.display = 'none';

  // Mostrar a seção selecionada
  switch (type) {
    case 'range':
      if (DOM.periodRangeSection) DOM.periodRangeSection.style.display = 'block';
      break;
    case 'specific':
      if (DOM.periodSpecificSection) {
        DOM.periodSpecificSection.style.display = 'block';
        // Garantir que há pelo menos um campo de data
        if (!DOM.specificDatesContainer.querySelector('.specific-date')) {
          addSpecificDateField();
        }
      }
      break;
    case 'recurring':
      if (DOM.periodRecurringSection) {
        DOM.periodRecurringSection.style.display = 'block';
        // Definir data mínima para hoje
        const today = new Date().toISOString().split('T')[0];
        if (DOM.recurringStartDate) DOM.recurringStartDate.min = today;
        if (DOM.recurringEndDate) DOM.recurringEndDate.min = today;
      }
      break;
  }
}

// Adicionar campo de data para dias específicos - VERSÃO CORRIGIDA
function addSpecificDateField() {
  if (!DOM.specificDatesContainer) return;

  const dateRow = document.createElement('div');
  dateRow.className = 'date-input-row';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'specific-date';
  dateInput.required = true;
  
  // Definir data mínima como hoje
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn icon only remove-date';
  removeBtn.setAttribute('aria-label', 'Remover data');
  removeBtn.textContent = '✕';

  removeBtn.addEventListener('click', function () {
    dateRow.remove();
    // Se não houver mais campos, adicionar um vazio
    if (DOM.specificDatesContainer.children.length === 0) {
      addSpecificDateField();
    }
  });

  dateRow.appendChild(dateInput);
  dateRow.appendChild(removeBtn);
  DOM.specificDatesContainer.appendChild(dateRow);
  
  // Focar no novo campo
  setTimeout(() => dateInput.focus(), 100);
}

// Atualizar unidade de intervalo baseada na frequência - VERSÃO CORRIGIDA
function updateIntervalUnit() {
  if (!DOM.recurringFrequency || !DOM.intervalUnit) return;

  const frequency = DOM.recurringFrequency.value;
  const lang = getLang();
  let unit = t('frequency.daily');

  switch (frequency) {
    case 'weekly':
      unit = t('frequency.weekly');
      break;
    case 'monthly':
      unit = t('frequency.monthly');
      break;
  }

  DOM.intervalUnit.textContent = unit;
}

// Habilitar/desabilitar campos de término baseado na seleção - VERSÃO CORRIGIDA
function toggleRecurringEndFields() {
  const selectedRadio = document.querySelector('input[name="recurringEnd"]:checked');
  if (!selectedRadio) return;
  
  const selectedValue = selectedRadio.value;

  if (DOM.recurringOccurrences) {
    DOM.recurringOccurrences.disabled = selectedValue !== 'after';
    if (!DOM.recurringOccurrences.value) {
      DOM.recurringOccurrences.value = '10';
    }
  }

  if (DOM.recurringEndDate) {
    DOM.recurringEndDate.disabled = selectedValue !== 'on';
    if (!DOM.recurringEndDate.value && selectedValue === 'on') {
      const today = new Date();
      today.setMonth(today.getMonth() + 1); // 1 mês a partir de hoje
      DOM.recurringEndDate.value = today.toISOString().split('T')[0];
    }
  }
}

// Gerar todas as datas para uma rotina baseada no tipo de período - VERSÃO CORRIGIDA
function generateRoutineDates(periodType, formData) {
  let dates = [];

  try {
    switch (periodType) {
      case 'range':
        if (!formData.startDate || !formData.endDate) {
          throw new Error('Datas de início e término são obrigatórias');
        }

        const start = new Date(formData.startDate + 'T00:00:00');
        const end = new Date(formData.endDate + 'T00:00:00');
        
        if (start > end) {
          throw new Error('Data de início não pode ser posterior à data de término');
        }

        const selectedDays = formData.selectedDays && formData.selectedDays.length > 0 
          ? formData.selectedDays 
          : [1, 2, 3, 4, 5]; // Padrão: dias de semana

        let current = new Date(start);
        while (current <= end) {
          if (selectedDays.includes(current.getDay())) {
            dates.push(formatDateForInput(current));
          }
          current.setDate(current.getDate() + 1);
          
          // Limite de segurança
          if (dates.length > 365) break;
        }
        break;

      case 'specific':
        if (!formData.specificDates || formData.specificDates.length === 0) {
          throw new Error('Pelo menos uma data específica é obrigatória');
        }

        dates = formData.specificDates
          .filter(date => date && date.trim() !== '')
          .map(date => {
            const dateObj = new Date(date + 'T00:00:00');
            if (isNaN(dateObj.getTime())) {
              throw new Error(`Data inválida: ${date}`);
            }
            return formatDateForInput(dateObj);
          })
          .filter((date, index, self) => self.indexOf(date) === index); // Remover duplicatas
        break;

      case 'recurring':
        dates = generateRecurringDates(formData);
        break;

      default:
        throw new Error('Tipo de período desconhecido');
    }
  } catch (error) {
    console.error('Erro ao gerar datas:', error);
    showToast(error.message, 'error');
    return [];
  }

  return dates;
}

// Gerar datas para rotinas recorrentes - VERSÃO CORRIGIDA
function generateRecurringDates(formData) {
  const dates = [];
  
  if (!formData.startDate) {
    throw new Error('Data de início é obrigatória');
  }

  const startDate = new Date(formData.startDate + 'T00:00:00');
  const frequency = formData.frequency || 'weekly';
  const interval = parseInt(formData.interval) || 1;

  if (interval < 1) {
    throw new Error('Intervalo deve ser pelo menos 1');
  }

  let currentDate = new Date(startDate);
  let occurrenceCount = 0;
  
  const maxOccurrences = formData.endType === 'after' ? parseInt(formData.occurrences) || 10 : Infinity;
  const endDate = formData.endType === 'on' && formData.endDate 
    ? new Date(formData.endDate + 'T00:00:00') 
    : null;

  // Validar datas
  if (endDate && startDate > endDate) {
    throw new Error('Data de início não pode ser posterior à data de término');
  }

  while (occurrenceCount < 365) { // Limite de segurança
    // Verificar condições de término
    if (formData.endType === 'after' && occurrenceCount >= maxOccurrences) {
      break;
    }
    if (formData.endType === 'on' && currentDate > endDate) {
      break;
    }

    dates.push(formatDateForInput(currentDate));
    occurrenceCount++;

    // Avançar para a próxima data baseada na frequência
    switch (frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * interval));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + interval);
        // Ajustar para o último dia do mês se necessário
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(0);
        if (currentDate.getDate() > nextMonth.getDate()) {
          currentDate.setDate(nextMonth.getDate());
        }
        break;
    }

    // Parar se exceder um limite razoável
    if (occurrenceCount >= 365) break;
  }

  return dates;
}

// Adicionar múltiplas rotinas baseadas nas datas geradas - VERSÃO CORRIGIDA
function addRoutinesWithCustomPeriod(formData) {
  try {
    const dates = generateRoutineDates(formData.periodType, formData);

    if (dates.length === 0) {
      showToast('Nenhuma data válida foi gerada para esta rotina.', 'error');
      return;
    }

    // Aviso para muitas rotinas
    if (dates.length > 50) {
      const confirmed = confirm(`Esta ação criará ${dates.length} rotinas. Isso pode afetar o desempenho. Deseja continuar?`);
      if (!confirmed) return;
    }

    let createdCount = 0;
    const errors = [];

    dates.forEach((date, index) => {
      try {
        const routineData = {
          title: formData.title + (dates.length > 1 ? ` (${index + 1}/${dates.length})` : ''),
          description: formData.description,
          date: date,
          time: formData.time,
          priority: formData.priority,
          tag: formData.tag,
          status: 'todo',
          completed: false,
          isRecurring: formData.periodType === 'recurring'
        };

        const result = addNewRoutine(routineData);
        if (result) createdCount++;
      } catch (error) {
        errors.push(`Erro na data ${date}: ${error.message}`);
      }
    });

    if (errors.length > 0) {
      console.error('Erros ao criar rotinas:', errors);
      showToast(`${createdCount} rotina(s) criada(s), ${errors.length} com erro.`, 'warning');
    } else {
      const lang = getLang();
      const successMessages = {
        'pt-BR': `${createdCount} rotina(s) criada(s) com sucesso!`,
        'en-US': `${createdCount} routine(s) created successfully!`,
        'es-ES': `¡${createdCount} rutina(s) creada(s) con éxito!`,
        'fr-FR': `${createdCount} routine(s) créée(s) avec succès !`
      };
      showToast(successMessages[lang] || successMessages['pt-BR'], 'success');
    }
  } catch (error) {
    console.error('Erro ao adicionar rotinas:', error);
    showToast('Erro ao criar rotinas: ' + error.message, 'error');
  }
}

// Processar formulário de período personalizado - VERSÃO COMPLETAMENTE CORRIGIDA
function processCustomPeriodForm(e) {
  if (e && e.preventDefault) e.preventDefault();

  // Verificar se é o botão cancelar
  const submitter = e.submitter;
  if (submitter && submitter.value === 'cancel') {
    closeCustomPeriodModal();
    return;
  }

  // Coletar dados básicos do formulário
  const title = DOM.customTitle ? DOM.customTitle.value.trim() : '';
  const description = DOM.customDesc ? DOM.customDesc.value : '';
  const time = DOM.customTime ? DOM.customTime.value || undefined : undefined;
  const priority = DOM.customPriority ? DOM.customPriority.value : 'medium';
  const tag = DOM.customTag ? normalizeTag(DOM.customTag.value) : undefined;

  if (!title) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Determinar tipo de período selecionado
  const periodTypeRadio = document.querySelector('input[name="periodType"]:checked');
  if (!periodTypeRadio) {
    showToast('Selecione um tipo de período.', 'error');
    return;
  }

  const periodType = periodTypeRadio.value;
  let formData = {
    title,
    description,
    time,
    priority,
    tag,
    periodType
  };

  // Coletar dados específicos do tipo de período
  try {
    switch (periodType) {
      case 'range':
        const startDate = DOM.customStartDate ? DOM.customStartDate.value : '';
        const endDate = DOM.customEndDate ? DOM.customEndDate.value : '';

        if (!startDate || !endDate) {
          showToast('As datas de início e término são obrigatórias.', 'error');
          return;
        }

        // Coletar dias da semana selecionados
        const selectedDays = [];
        document.querySelectorAll('.weekday-option input[type="checkbox"]:checked').forEach(cb => {
          selectedDays.push(parseInt(cb.value));
        });

        formData.startDate = startDate;
        formData.endDate = endDate;
        formData.selectedDays = selectedDays;
        break;

      case 'specific':
        const specificDates = [];
        document.querySelectorAll('.specific-date').forEach(input => {
          if (input.value) specificDates.push(input.value);
        });

        if (specificDates.length === 0) {
          showToast('Pelo menos uma data específica deve ser fornecida.', 'error');
          return;
        }

        formData.specificDates = specificDates;
        break;

      case 'recurring':
        const recurringStartDate = DOM.recurringStartDate ? DOM.recurringStartDate.value : '';
        const frequency = DOM.recurringFrequency ? DOM.recurringFrequency.value : 'weekly';
        const interval = DOM.recurringInterval ? parseInt(DOM.recurringInterval.value) : 1;
        const endTypeRadio = document.querySelector('input[name="recurringEnd"]:checked');
        
        if (!endTypeRadio) {
          showToast('Selecione uma opção de término.', 'error');
          return;
        }

        const endType = endTypeRadio.value;

        if (!recurringStartDate) {
          showToast('A data de início é obrigatória para rotinas recorrentes.', 'error');
          return;
        }

        if (interval < 1) {
          showToast('O intervalo deve ser pelo menos 1.', 'error');
          return;
        }

        formData.startDate = recurringStartDate;
        formData.frequency = frequency;
        formData.interval = interval;
        formData.endType = endType;

        if (endType === 'after') {
          const occurrences = DOM.recurringOccurrences ? parseInt(DOM.recurringOccurrences.value) : 10;
          if (occurrences < 1) {
            showToast('O número de ocorrências deve ser pelo menos 1.', 'error');
            return;
          }
          formData.occurrences = occurrences;
        } else if (endType === 'on') {
          const endDate = DOM.recurringEndDate ? DOM.recurringEndDate.value : '';
          if (!endDate) {
            showToast('A data de término é obrigatória quando selecionada.', 'error');
            return;
          }
          formData.endDate = endDate;
        }
        break;
    }

    // Criar as rotinas
    addRoutinesWithCustomPeriod(formData);

    // Fechar modal apenas se não houver erros
    closeCustomPeriodModal();

  } catch (error) {
    console.error('Erro no processamento do formulário:', error);
    showToast('Erro: ' + error.message, 'error');
  }
}

/*
  16) SISTEMA DE NOTIFICAÇÕES
*/

// Configurar notificações
function setupNotifications() {
  if (!('Notification' in window)) {
    console.log('Este navegador não suporta notificações');
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.disabled = true;
      DOM.notificationsToggle.checked = false;
    }
    return;
  }

  // Verificar se já temos permissão
  if (Notification.permission === 'granted') {
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = true;
    }
  } else if (Notification.permission === 'denied') {
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = false;
      DOM.notificationsToggle.disabled = true;
    }
  }
}

// Função para solicitar permissão de notificação
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast(t('notification.unsupported'), 'error');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    showToast(t('notification.permissionDenied'), 'error');
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = false;
    }
    return false;
  }

  const permission = await Notification.requestPermission();
  
  if (permission === 'granted') {
    showToast('Notificações ativadas com sucesso!', 'success');
    return true;
  } else {
    showToast(t('notification.permissionDenied'), 'error');
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = false;
    }
    return false;
  }
}

// Função para enviar notificação de exemplo
function sendTestNotification() {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification('Life Build', {
    body: t('notification.test'),
    icon: 'img/Ryo.jpg',
    badge: 'img/Ryo.jpg'
  });

  notification.onclick = function() {
    window.focus();
    notification.close();
  };
}

// Configurar evento específico para o toggle de notificações
function setupNotificationToggle() {
  if (DOM.notificationsToggle) {
    DOM.notificationsToggle.addEventListener('change', function() {
      if (this.checked) {
        // Se está tentando ativar, solicitar permissão
        requestNotificationPermission().then(permissionGranted => {
          if (!permissionGranted) {
            this.checked = false;
          } else {
            // Enviar notificação de teste
            setTimeout(sendTestNotification, 1000);
          }
        });
      }
      // Se está desativando, não precisa fazer nada além de atualizar o estado
    });
  }
}

// Função para enviar notificações de lembretes
function sendReminderNotification(task) {
  if (!state.preferences.notifications || !('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const now = new Date();
  const taskTime = task.time ? new Date(`${task.date}T${task.time}`) : new Date(`${task.date}T09:00:00`);
  
  // Verificar se a tarefa é para hoje e está próxima do horário
  if (task.date === now.toISOString().split('T')[0]) {
    const timeDiff = taskTime.getTime() - now.getTime();
    
    // Notificar se faltar 15 minutos ou menos, ou se já passou do horário
    if (timeDiff <= 15 * 60 * 1000 && timeDiff > -60 * 60 * 1000) {
      const notification = new Notification('Life Build', {
        body: `${t('notification.reminder')}"${task.title}" - ${task.time || t('filter.hoje')}`,
        icon: 'img/Ryo.jpg',
        tag: task.id
      });

      notification.onclick = function() {
        window.focus();
        openTaskDetails(task.id);
        notification.close();
      };
    }
  }
}

/*
   17) EVENTOS GERAIS E LIGAÇÕES
*/

// Configura todos os listeners de UI (botões, formulários, links, etc.)
function setupEventListeners() {
  // Toggle sidebar
  if (DOM.btnToggleSidebar) DOM.btnToggleSidebar.addEventListener('click', toggleSidebar);

  // Botão de adicionar rápida
  if (DOM.btnQuickAdd && DOM.modalCustomPeriod) {
    DOM.btnQuickAdd.addEventListener('click', openCustomPeriodModal);
  }

  // Navegação principal (links com data-view)
  if (DOM.menuLinks && DOM.menuLinks.length) {
    DOM.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        setCurrentView(view);
      });
    });
  }

  // Filtros rápidos (data-filter)
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const wasActive = link.classList.contains('is-active');
        // limpa todos
        DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
        // alterna
        if (!wasActive) link.classList.add('is-active');
        render();
      });
    });
  }

  // Modal adicionar tag - CORREÇÃO COMPLETA
  if (DOM.btnAddTag) {
    DOM.btnAddTag.addEventListener('click', openAddTagModal);
  }

  // Formulário de adicionar tag
  const addTagForm = document.getElementById('addTagForm');
  if (addTagForm) {
    addTagForm.addEventListener('submit', processAddTagForm);

    // Botão cancelar no modal de etiqueta
    const cancelBtn = addTagForm.querySelector('button[value="cancel"]');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAddTagModal();
      });
    }
  }

  // Fechar painel detalhes
  if (DOM.detailsClose) DOM.detailsClose.addEventListener('click', closeDetails);

  // Submit do formulário de detalhes (salvar)
  if (DOM.detailsForm) DOM.detailsForm.addEventListener('submit', saveTaskDetails);

  // Botões excluir e duplicar no painel de detalhes
  if (DOM.btnDeleteTask) DOM.btnDeleteTask.addEventListener('click', deleteCurrentTask);
  if (DOM.btnDuplicateTask) DOM.btnDuplicateTask.addEventListener('click', duplicateCurrentTask);

  // Event listeners para o modal de período personalizado
  if (DOM.periodTypeRadios) {
    DOM.periodTypeRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        showPeriodSection(this.value);
      });
    });
  }

  if (DOM.addDateBtn) {
    DOM.addDateBtn.addEventListener('click', addSpecificDateField);
  }

  if (DOM.recurringFrequency) {
    DOM.recurringFrequency.addEventListener('change', updateIntervalUnit);
  }

  if (DOM.recurringEndRadios) {
    DOM.recurringEndRadios.forEach(radio => {
      radio.addEventListener('change', toggleRecurringEndFields);
    });
  }

  if (DOM.customPeriodForm) {
    DOM.customPeriodForm.addEventListener('submit', processCustomPeriodForm);

    // Botão cancelar
    const cancelBtn = DOM.customPeriodForm.querySelector('button[value="cancel"]');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        closeCustomPeriodModal();
      });
    }
  }

  // Navegação do calendário (mudar mês)
  if (DOM.calPrev) DOM.calPrev.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
  });
  if (DOM.calNext) DOM.calNext.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Configurações
  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener('change', toggleTheme);
  }

  if (DOM.btnSaveSettings) {
    DOM.btnSaveSettings.addEventListener('click', saveSettings);
  }

  if (DOM.btnResetSettings) {
    DOM.btnResetSettings.addEventListener('click', resetSettings);
  }

  if (DOM.btnOpenConfig) {
    DOM.btnOpenConfig.addEventListener('click', (e) => {
      e.preventDefault();
      setCurrentView('config');
    });
  }

  // Controle de idioma
  if (DOM.appLanguage) {
    DOM.appLanguage.addEventListener('change', e => {
      changeLanguage(e.target.value);
    });
  }

  // Controles de configuração em tempo real
  if (DOM.fontSize) {
    DOM.fontSize.addEventListener('input', (e) => {
      document.body.style.fontSize = e.target.value + 'px';
      if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = e.target.value + 'px';
    });
  }

  if (DOM.fontFamily) {
    DOM.fontFamily.addEventListener('change', (e) => {
      document.body.style.fontFamily = e.target.value;
    });
  }

  // Perfil
  if (DOM.showEmail) {
    DOM.showEmail.addEventListener('click', (e) => {
      e.preventDefault();
      if (DOM.userEmail.textContent.includes('*')) {
        DOM.userEmail.textContent = state.profile.email;
        DOM.showEmail.textContent = t('profile.ocultar');
      } else {
        DOM.userEmail.textContent = '*****************@gmail.com';
        DOM.showEmail.textContent = t('profile.mostrar');
      }
    });
  }

  // Botões de edição do perfil
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const field = e.target.dataset.edit;
      const currentValue = state.profile[field];
      const newValue = prompt(`Editar ${field}:`, currentValue);
      if (newValue && newValue.trim()) {
        state.profile[field] = newValue.trim();
        saveData();
        renderProfile();
        showToast(`${field} atualizado com sucesso!`, 'success');
      }
    });
  });

  // Fechar modal de etiqueta com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const tagModal = document.getElementById('modalAddTag');
      if (tagModal && tagModal.open) {
        closeAddTagModal();
      }
    }
  });
}

/*
   18) FUNÇÕES AUXILIARES (UI/Helpers)
*/

// Alterna a sidebar visível / escondida e persiste a preferência
function toggleSidebar() {
  state.showSidebar = !state.showSidebar;
  if (DOM.app) DOM.app.setAttribute('data-layout', state.showSidebar ? 'with-sidebar' : 'without-sidebar');
  saveData();
}

// Muda a view principal (Hoje / Semana / Calendário / Todas / Config)
function setCurrentView(view) {
  // Ajusta estado
  // normalize view to string and lower-case for safety
  const v = (view || 'hoje').toString();
  state.currentView = v;

  // Atualiza classes ativas nos links do menu
  if (DOM.menuLinks && DOM.menuLinks.length) {
    DOM.menuLinks.forEach(link => {
      // compare case-insensitive to avoid mismatch between html/data-view and state
      const linkView = (link.dataset.view || '').toString();
      link.classList.toggle('is-active', linkView.toLowerCase() === String(state.currentView).toLowerCase());
    });
  }

  // Limpa filtros rápidos ao trocar de view
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
  }

  render();
}

// Atualiza relógio e data na UI
function updateClock() {
  const now = new Date();
  const lang = getLang();
  if (DOM.todayDate) DOM.todayDate.textContent = now.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
  if (DOM.nowTime) DOM.nowTime.textContent = now.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
}

/*
   19) SISTEMA DE GRÁFICOS
*/

// Inicializar todos os gráficos
function initCharts() {
  console.log('Inicializando gráficos...');

  if (!state.routines || state.routines.length === 0) {
    console.log('Nenhuma rotina encontrada para gráficos');
    renderEmptyCharts();
    return;
  }

  try {
    renderWeeklyProgressChart();
    renderTimeDistributionChart();
    renderHabitsOverTimeChart();
    console.log('Gráficos inicializados com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar gráficos:', error);
    renderEmptyCharts();
  }
}

// Renderizar gráfico de progresso semanal - VERSÃO SIMPLIFICADA
function renderWeeklyProgressChart() {
  const ctx = document.getElementById('weeklyProgressChart');
  if (!ctx) {
    console.log('Elemento weeklyProgressChart não encontrado');
    return;
  }

  // Destruir gráfico anterior se existir
  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const weeklyData = [5, 8, 6, 9, 7, 4, 3];
  const lang = getLang();

  ctx.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: I18N.weekdays[lang],
      datasets: [{
        label: t('chart.weeklyProgress'),
        data: weeklyData,
        backgroundColor: '#ff5454',
        borderColor: '#ff2c2c',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Atualiza texto informativo
  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoWeekly');
  }
}

// Renderizar gráfico de distribuição de tempo - VERSÃO SIMPLIFICADA
function renderTimeDistributionChart() {
  const ctx = document.getElementById('timeDistributionChart');
  if (!ctx) return;

  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const lang = getLang();

  ctx.chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [t('tag.trabalho'), t('tag.saude'), t('tag.estudos'), t('tag.pessoal')],
      datasets: [{
        data: [30, 20, 25, 25],
        backgroundColor: ['#ff5454', '#4f46e5', '#10b981', '#f59e0b'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Atualiza texto informativo
  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoTime');
  }
}

// Renderizar gráfico de hábitos ao longo do tempo - VERSÃO SIMPLIFICADA
function renderHabitsOverTimeChart() {
  const ctx = document.getElementById('habitsOverTimeChart');
  if (!ctx) return;

  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const lang = getLang();

  ctx.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['01/03', '02/03', '03/03', '04/03', '05/03', '06/03', '07/03'],
      datasets: [{
        label: t('chart.habitsOverTime'),
        data: [3, 5, 2, 6, 4, 7, 8],
        borderColor: '#ff5454',
        backgroundColor: 'rgba(255, 84, 84, 0.1)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Atualiza texto informativo
  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoHabits');
  }
}

function renderEmptyCharts() {
  const chartIds = [
    'weeklyProgressChart',
    'timeDistributionChart',
    'habitsOverTimeChart'
  ];

  chartIds.forEach(chartId => {
    const ctx = document.getElementById(chartId);
    if (ctx) {
      if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
      }

      const lang = getLang();

      // Criar gráfico vazio
      ctx.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [t('empty.none')],
          datasets: [{
            label: t('empty.addRoutines'),
            data: [1],
            backgroundColor: '#e5e7eb'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

      // Atualiza texto informativo
      const infoText = ctx.closest('.chart-container').querySelector('.info-text');
      if (infoText) {
        infoText.textContent = t('empty.addRoutines');
      }
    }
  });
}

/*
   20) SISTEMA DE TROCA DE FOTO DO PERFIL
*/

// Configurar evento para trocar foto do perfil
function setupProfilePhotoChange() {
  const profilePhoto = document.querySelector('.profile-photo');
  const profilePhotoInput = document.getElementById('profilePhotoInput');
  
  if (profilePhoto && profilePhotoInput) {
    // Clicar na foto abre o seletor de arquivos
    profilePhoto.addEventListener('click', () => {
      profilePhotoInput.click();
    });
    
    // Quando um arquivo é selecionado
    profilePhotoInput.addEventListener('change', handleProfilePhotoChange);
  }
}

// Processar a troca da foto do perfil
function handleProfilePhotoChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validar tipo de arquivo
  if (!file.type.startsWith('image/')) {
    showToast('Por favor, selecione uma imagem válida.', 'error');
    return;
  }
  
  // Validar tamanho do arquivo (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showToast('A imagem deve ter no máximo 5MB.', 'error');
    return;
  }
  
  // Ler a imagem e atualizar o perfil
  const reader = new FileReader();
  
  reader.onload = function(e) {
    updateProfilePhoto(e.target.result);
  };
  
  reader.onerror = function() {
    showToast('Erro ao carregar a imagem.', 'error');
  };
  
  reader.readAsDataURL(file);
}

// Atualizar a foto do perfil no estado e na interface
function updateProfilePhoto(imageData) {
  // Atualizar no estado
  if (!state.profile) state.profile = {};
  state.profile.photo = imageData;
  
  // Atualizar na interface
  const profilePhoto = document.querySelector('.profile-photo');
  const topbarAvatar = document.querySelector('.topbar .avatar img');
  
  if (profilePhoto) {
    profilePhoto.src = imageData;
  }
  
  if (topbarAvatar) {
    topbarAvatar.src = imageData;
  }
  
  // Salvar no localStorage
  saveData();
  
  showToastTranslation('toast.saved', 'success');
}

// Carregar foto do perfil salva
function loadProfilePhoto() {
  if (state.profile && state.profile.photo) {
    const profilePhoto = document.querySelector('.profile-photo');
    const topbarAvatar = document.querySelector('.topbar .avatar img');
    
    if (profilePhoto) {
      profilePhoto.src = state.profile.photo;
    }
    
    if (topbarAvatar) {
      topbarAvatar.src = state.profile.photo;
    }
  }
}

/*
   21) INICIALIZAÇÃO DA APLICAÇÃO
*/

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', init);
