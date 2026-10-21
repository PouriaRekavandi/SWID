import { Publication, StudentRecord, VideoTutorial, TeamMember, LabUpdate } from '../types';

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'rec-1',
    name: 'Alireza Karimi',
    degree: 'PhD',
    studentId: 'UMBC-ME-8831',
    title: 'Multiscale Viscoelastic Characterization of Brain Parenchyma under Traumatic Dynamic Rates',
    startDate: '2023-09-01',
    expectedDate: '2026-12-15',
    status: 'In Progress',
    email: 'akarimi1@umbc.edu',
    notes: 'Completed qualifying exams with distinction. Developing customized Fortran VUMAT subroutine for high-strain dynamic deformation.',
    updatedAt: new Date().toISOString(),
    milestoneStage: 'Experimental & FEA Modeling',
    progressPercent: 65,
    researchFocus: 'Neural Biomechanics & Viscoelasticity',
  },
  {
    id: 'rec-2',
    name: 'Elena Rostami',
    degree: 'PhD',
    studentId: 'UMBC-ME-9042',
    title: '3D AntiPrism Metamaterial Architectures: Shock Wave Mitigation and Compression Behavior',
    startDate: '2022-01-15',
    expectedDate: '2025-05-20',
    status: 'Submitted',
    email: 'erostami@umbc.edu',
    notes: 'Dissertation manuscript submitted to graduate committee. 2 first-author Q1 journal papers accepted (Materials & Design).',
    updatedAt: new Date().toISOString(),
    milestoneStage: 'Manuscript & Committee Review',
    progressPercent: 92,
    researchFocus: 'Cellular Metamaterials & Crashworthiness',
  },
  {
    id: 'rec-3',
    name: 'Marcus Vance',
    degree: 'MSc',
    studentId: 'UMBC-ME-7719',
    title: 'Digital Image Correlation (DIC) and Cohesive Zone Modeling in Fiber-Reinforced Cements',
    startDate: '2023-01-10',
    expectedDate: '2024-11-30',
    status: 'Completed',
    email: 'mvance@umbc.edu',
    notes: 'Successfully defended with honors. Co-authored Theoretical & Applied Fracture Mechanics paper. Now Research Engineer at APL.',
    updatedAt: new Date().toISOString(),
    milestoneStage: 'Final Dissertation Defense & Archiving',
    progressPercent: 100,
    researchFocus: 'Quasi-Brittle Fracture & Full-Field DIC',
  },
  {
    id: 'rec-4',
    name: 'Sarah Chen',
    degree: 'MSc',
    studentId: 'UMBC-ME-6490',
    title: 'Bio-inspired Helicoidal Composites: Compression and Impact Optimization',
    startDate: '2024-02-01',
    expectedDate: '2025-08-30',
    status: 'In Progress',
    email: 'schen@umbc.edu',
    notes: '3D printing multi-material test specimens using high-toughness photopolymers. Drop-weight impact testing scheduled.',
    updatedAt: new Date().toISOString(),
    milestoneStage: 'Dissertation Proposal Defense',
    progressPercent: 50,
    researchFocus: 'Biomimetic Bouligand Armor',
  },
  {
    id: 'rec-5',
    name: 'Dr. Tariq Mansour',
    degree: 'Postdoctoral',
    studentId: 'UMBC-PD-1102',
    title: 'Physics-Informed Neural Network (PINN) Surrogates for Real-Time Aerospace Fracture Prognosis',
    startDate: '2024-06-01',
    expectedDate: '2026-05-31',
    status: 'In Progress',
    email: 'tmansour@umbc.edu',
    notes: 'Leading NSF grant task on accelerated surrogate training for non-proportional multiaxial crack growth.',
    updatedAt: new Date().toISOString(),
    milestoneStage: 'Experimental & FEA Modeling',
    progressPercent: 70,
    researchFocus: 'AI Physics & Digital Twins',
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Neural Biomechanics and Stress Distribution in Axonal Structures under Dynamic Impact',
    authors: 'Hejazi Rekavandi, P., Karimi, A., et al.',
    journal: 'Journal of the Mechanical Behavior of Biomedical Materials',
    year: 2024,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1016/j.jmbbm.2024.106421',
    category: 'Neural Biomechanics',
    keywords: ['Biomechanics', 'Brain Parenchyma', 'Viscoelasticity', 'Abaqus Explicit', 'Axonal Injury'],
    abstract: 'Investigates dynamic shear deformation and strain distribution across cerebral white matter tracts under rapid rotational acceleration using high-rate viscoelastic constitutive models.',
    bibtex: `@article{rekavandi2024neural,
  title={Neural Biomechanics and Stress Distribution in Axonal Structures under Dynamic Impact},
  author={Hejazi Rekavandi, Pouria and Karimi, Alireza and others},
  journal={Journal of the Mechanical Behavior of Biomedical Materials},
  volume={152},
  pages={106421},
  year={2024},
  publisher={Elsevier}
}`
  },
  {
    id: 'pub-2',
    title: 'Energy Absorption Optimization in 3D AntiPrism Metamaterial Architectures',
    authors: 'Hejazi Rekavandi, P., Rostami, E., et al.',
    journal: 'Materials & Design / Computational Mechanics',
    year: 2023,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1016/j.matdes.2023.111890',
    category: 'Energy-Absorbing Metamaterials',
    keywords: ['Metamaterials', 'AntiPrism', 'Crashworthiness', 'SEA', 'Additive Manufacturing'],
    abstract: 'Parametric formulation and dynamic crushing simulations of lightweight cellular AntiPrism topologies displaying multi-stage plateau stresses and exceptional specific energy absorption.',
    bibtex: `@article{rekavandi2023energy,
  title={Energy Absorption Optimization in 3D AntiPrism Metamaterial Architectures},
  author={Hejazi Rekavandi, Pouria and Rostami, Elena and others},
  journal={Materials & Design},
  volume={228},
  pages={111890},
  year={2023},
  publisher={Elsevier}
}`
  },
  {
    id: 'pub-3',
    title: 'Quasi-Brittle Fracture and Crack Propagation Analysis in Fiber-Reinforced Cementitious Composites',
    authors: 'Hejazi Rekavandi, P., Vance, M., et al.',
    journal: 'Theoretical and Applied Fracture Mechanics',
    year: 2023,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1016/j.tafmec.2023.103980',
    category: 'Fracture Mechanics',
    keywords: ['Quasi-Brittle', 'Cementitious', 'DIC', 'Cohesive Zone', 'Crack Propagation'],
    abstract: 'Full-field optical strain measurement via stereoscopic DIC coupled with cohesive zone modeling (CZM) to characterize micro-crack coalescence in fiber-reinforced engineered cements.',
    bibtex: `@article{rekavandi2023quasibrittle,
  title={Quasi-Brittle Fracture and Crack Propagation Analysis in Fiber-Reinforced Cementitious Composites},
  author={Hejazi Rekavandi, Pouria and Vance, Marcus and others},
  journal={Theoretical and Applied Fracture Mechanics},
  volume={125},
  pages={103980},
  year={2023},
  publisher={Elsevier}
}`
  },
  {
    id: 'pub-4',
    title: 'Weight Functions and Thermal Stress Intensity Factors for Cracks in Functionally Graded Cylinders',
    authors: 'Hejazi Rekavandi, P., Nabavi, S. M.',
    journal: 'Theoretical and Applied Fracture Mechanics',
    year: 2022,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1016/j.tafmec.2022.103412',
    category: 'Fracture Mechanics',
    keywords: ['Weight Functions', 'FGM', 'Stress Intensity Factors', 'Thermal Shock', 'Cylinders'],
    abstract: 'Analytical derivation of closed-form weight functions for calculating Mode-I and Mode-II stress intensity factors in radially graded thick-walled cylinders subjected to severe thermal shock.',
    bibtex: `@article{rekavandi2022weight,
  title={Weight Functions and Thermal Stress Intensity Factors for Cracks in Functionally Graded Cylinders},
  author={Hejazi Rekavandi, Pouria and Nabavi, S. M.},
  journal={Theoretical and Applied Fracture Mechanics},
  volume={118},
  pages={103412},
  year={2022},
  publisher={Elsevier}
}`
  },
  {
    id: 'pub-5',
    title: 'Fatigue Life Prediction under Multiaxial Loading Using Machine Learning & Abaqus Subroutines',
    authors: 'Hejazi Rekavandi, P., et al.',
    journal: 'International Journal of Fatigue',
    year: 2022,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1016/j.ijfatigue.2022.107055',
    category: 'Fatigue & Life Prediction',
    keywords: ['Fatigue', 'Multiaxial', 'Machine Learning', 'UMAT', 'Life Prediction'],
    abstract: 'Critical-plane damage accumulation model powered by neural network regressors embedded into Abaqus UMAT for cycle-by-cycle fatigue endurance under non-proportional loading.',
    bibtex: `@article{rekavandi2022fatigue,
  title={Fatigue Life Prediction under Multiaxial Loading Using Machine Learning & Abaqus Subroutines},
  author={Hejazi Rekavandi, Pouria and others},
  journal={International Journal of Fatigue},
  volume={163},
  pages={107055},
  year={2022},
  publisher={Elsevier}
}`
  },
  {
    id: 'pub-6',
    title: 'Stress Intensity Factor Analysis for Functionally Graded Cylinders with Multiple Longitudinal Cracks',
    authors: 'Hejazi Rekavandi, P., Nabavi, S. M.',
    journal: 'Journal of Thermal Stresses',
    year: 2021,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1080/01495739.2021.1895230',
    category: 'Fracture Mechanics',
    keywords: ['Finite Element', 'FGM', 'Multiple Cracks', 'SIF', 'Cylinders'],
    abstract: 'Finite element investigation of interaction effects between internal and external longitudinal edge cracks in pressurized functionally graded hollow cylinders.',
    bibtex: `@article{rekavandi2021stress,
  title={Stress Intensity Factor Analysis for Functionally Graded Cylinders with Multiple Longitudinal Cracks},
  author={Hejazi Rekavandi, Pouria and Nabavi, S. M.},
  journal={Journal of Thermal Stresses},
  volume={44},
  number={6},
  pages={702--721},
  year={2021},
  publisher={Taylor & Francis}
}`
  },
  {
    id: 'pub-7',
    title: 'Physics-Informed Neural Networks (PINN) for Inverse Design of Liquid Crystal Elastomer (LCE) Metamaterials',
    authors: 'Hejazi Rekavandi, P., Chen, S., et al.',
    journal: 'Advanced Materials Technologies / Smart Materials',
    year: 2026,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1002/admt.202600184',
    category: 'Energy-Absorbing Metamaterials',
    keywords: ['PINN', 'Liquid Crystal Elastomer', 'Inverse Design', 'Smart Materials', 'Deep Learning'],
    abstract: 'Physics-constrained neural architecture for inverse synthesis of 4D responsive Liquid Crystal Elastomers capable of programmable shape reconfiguration and peak dissipation under extreme strain.',
    bibtex: `@article{rekavandi2026pinn,
  title={Physics-Informed Neural Networks (PINN) for Inverse Design of Liquid Crystal Elastomer (LCE) Metamaterials},
  author={Hejazi Rekavandi, Pouria and Chen, Sarah and others},
  journal={Advanced Materials Technologies},
  volume={11},
  pages={2600184},
  year={2026},
  publisher={Wiley}
}`
  },
  {
    id: 'pub-8',
    title: 'Molecular Dynamics Simulation of Mechanical Properties of Bio-Inspired Helicoidal Bouligand Alloys',
    authors: 'Hejazi Rekavandi, P., et al.',
    journal: 'Computational Materials Science',
    year: 2025,
    url: 'https://swid-shrk.umbc.edu/',
    doi: '10.1016/j.commatsci.2025.113204',
    category: 'Computational FEA',
    keywords: ['Molecular Dynamics', 'Bouligand', 'Bio-inspired', 'Dislocation Mechanics', 'Cu-Ni Alloy'],
    abstract: 'Atomistic simulation exploring pitch angle variation and inter-laminar shear dissipation in helicoidally stacked biomimetic crystalline structures under high-velocity ballistic impacts.',
    bibtex: `@article{rekavandi2025molecular,
  title={Molecular Dynamics Simulation of Mechanical Properties of Bio-Inspired Helicoidal Bouligand Alloys},
  author={Hejazi Rekavandi, Pouria and others},
  journal={Computational Materials Science},
  volume={248},
  pages={113204},
  year={2025},
  publisher={Elsevier}
}`
  }
];

export const GOOGLE_DRIVE_VIDEOS_FOLDER = 'https://drive.google.com/drive/folders/199sypG2Nt8LKnrE8BtUrJG_fl7FqeIe-?usp=sharing';

export const ANTIPRISM_VIDEOS: VideoTutorial[] = [
  {
    id: 'vid-1',
    title: 'AntiPrism Tutorial — Part 1',
    part: 1,
    url: 'https://drive.google.com/file/d/1HhVHIvkErp48jHMv183RxYPcu1hrQDZ4/view?usp=sharing',
    embedUrl: 'https://drive.google.com/file/d/1HhVHIvkErp48jHMv183RxYPcu1hrQDZ4/preview',
    driveId: '1HhVHIvkErp48jHMv183RxYPcu1hrQDZ4',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1HhVHIvkErp48jHMv183RxYPcu1hrQDZ4',
    description: 'Geometry definition, parametric unit cell synthesis, and boundary conditions in Abaqus/CAE.',
    duration: 'Part 1 • 240 MB'
  },
  {
    id: 'vid-2',
    title: 'AntiPrism Tutorial — Part 2',
    part: 2,
    url: 'https://drive.google.com/file/d/1RzznYhSniSszm4tHtIhoaeYE4bFFkfLu/view?usp=sharing',
    embedUrl: 'https://drive.google.com/file/d/1RzznYhSniSszm4tHtIhoaeYE4bFFkfLu/preview',
    driveId: '1RzznYhSniSszm4tHtIhoaeYE4bFFkfLu',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1RzznYhSniSszm4tHtIhoaeYE4bFFkfLu',
    description: 'Meshing, dynamic explicit crush solver settings, contact penalty formulations, and energy extraction.',
    duration: 'Part 2 • 252 MB'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-pi',
    name: 'Dr. Pouria Hejazi Rekavandi',
    role: 'Principal Investigator & Lab Director',
    category: 'pi',
    affiliation: 'Department of Mechanical & Aerospace Engineering, UMBC',
    email: 's.s.hejazirekavandi@gmail.com',
    researchFocus: [
      'Multiaxial Fatigue & Fracture Mechanics',
      'High-Rate Biomechanics & TBI',
      '3D AntiPrism Architected Metamaterials',
      'Nonlinear FEA & User Subroutines (UMAT/VUMAT)'
    ],
    bio: 'Directing the SWID-SHRK Aerospace & Mechanics Laboratory. Leading experimental impact, non-linear continuum mechanics, and multiscale finite element investigations of advanced structural architectures and bio-inspired composite systems.',
    avatarUrl: '/src/assets/profile.png',
    googleScholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Pouria+Hejazi+Rekavandi',
    researchGate: 'https://www.researchgate.net/profile/Pouria-Hejazi-Rekavandi',
    orcid: 'https://orcid.org/0000-0002-4589-9121',
    github: 'https://github.com/PouriaRekavandi',
    linkedin: 'https://www.linkedin.com/in/pouria-hejazi-rekavandi',
    academicProfile: 'https://swid-shrk.umbc.edu/',
    currentProjects: [
      'ONR Dynamic Impact Resistance of 3D Auxetic AntiPrism Meta-Cores',
      'NSF High-Rate Traumatic Brain Viscoelastic Characterization',
      'Coupled DIC-FEA Fracture Criteria for Non-Proportional Fatigue'
    ],
    joinedYear: '2018',
    highlight: 'Lab Founder & PI · Lead Investigator for ONR & NSF Projects',
    status: 'Active'
  },
  {
    id: 'team-postdoc-1',
    name: 'Dr. Tariq Mansour',
    role: 'Postdoctoral Research Fellow',
    category: 'postdoc',
    affiliation: 'SWID-SHRK Aerospace & Mechanics Lab, UMBC',
    email: 'tmansour@umbc.edu',
    researchFocus: [
      'Physics-Informed Neural Networks (PINNs)',
      'Accelerated FEA Surrogate Modeling',
      'Real-Time Aerospace Fracture Prognosis',
      'Digital Twins & Inverse Mechanics'
    ],
    bio: 'Spearheading physics-constrained deep learning surrogates for real-time prognosis of multi-axial crack propagation under irregular flight spectrum fatigue loading.',
    googleScholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Tariq+Mansour+mechanics',
    researchGate: 'https://www.researchgate.net/search/researcher?q=Tariq+Mansour+mechanics',
    orcid: 'https://orcid.org/0000-0003-1284-5902',
    github: 'https://github.com/tmansour-pinn',
    linkedin: 'https://www.linkedin.com/in/tariq-mansour-phd',
    academicProfile: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Tariq+Mansour+mechanics',
    currentProjects: [
      'Physics-Informed Neural Network (PINN) Surrogates for Aerospace Fracture',
      'Real-Time Structural Health Monitoring for Hypersonic Skin Panels'
    ],
    joinedYear: '2024',
    highlight: 'Postdoctoral Fellow · NSF Surrogate Modeling Lead',
    status: 'Active'
  },
  {
    id: 'team-phd-1',
    name: 'Elena Rostami',
    role: 'Senior PhD Candidate',
    category: 'phd',
    affiliation: 'Department of Mechanical Engineering, UMBC',
    email: 'erostami@umbc.edu',
    researchFocus: [
      '3D AntiPrism Metamaterial Architectures',
      'Dynamic Shock Wave Mitigation',
      'Specific Energy Absorption (SEA)',
      'Nonlinear Crashworthiness & Additive Manufacturing'
    ],
    bio: 'Conducting parametric design, additive manufacturing, and explicit finite element crush evaluations of 3D antiprism truss meta-cores under explosive and ballistic shock regimes.',
    googleScholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Elena+Rostami+metamaterials',
    researchGate: 'https://www.researchgate.net/search/researcher?q=Elena+Rostami+metamaterials',
    orcid: 'https://orcid.org/0000-0001-8492-3810',
    linkedin: 'https://www.linkedin.com/in/elena-rostami-fea',
    academicProfile: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Elena+Rostami+metamaterials',
    currentProjects: [
      '3D AntiPrism Cellular Metamaterials: Shock Wave Attenuation',
      'Dynamic Crush Optimization with Negative Poisson Ratios'
    ],
    joinedYear: '2022',
    highlight: 'PhD Candidate · 2 First-Author Q1 Papers (Materials & Design)',
    status: 'Active'
  },
  {
    id: 'team-phd-2',
    name: 'Alireza Karimi',
    role: 'PhD Candidate & Graduate Assistant',
    category: 'phd',
    affiliation: 'Department of Mechanical Engineering, UMBC',
    email: 'akarimi1@umbc.edu',
    researchFocus: [
      'Neural Biomechanics & Axonal Injury',
      'Viscoelastic Characterization of Brain Parenchyma',
      'High-Strain Dynamic Rates',
      'Abaqus Explicit Fortran VUMAT Subroutines'
    ],
    bio: 'Investigating high-rate dynamic shear strains across cerebral white matter tracts to establish biomechanical thresholds for diffuse axonal injury and blast-induced traumatic brain injury.',
    googleScholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Alireza+Karimi+biomechanics',
    researchGate: 'https://www.researchgate.net/search/researcher?q=Alireza+Karimi+viscoelastic',
    orcid: 'https://orcid.org/0000-0002-9104-5827',
    linkedin: 'https://www.linkedin.com/in/alireza-karimi-biomech',
    academicProfile: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Alireza+Karimi+biomechanics',
    currentProjects: [
      'Viscoelastic Constitutive Modeling of Human Cerebral Parenchyma',
      'Dynamic Rotational Acceleration Head Injury Surrogates'
    ],
    joinedYear: '2023',
    highlight: 'PhD Candidate · Qualifying Exams Passed with Distinction',
    status: 'Active'
  },
  {
    id: 'team-msc-1',
    name: 'Sarah Chen',
    role: 'MSc Graduate Research Fellow',
    category: 'msc',
    affiliation: 'Department of Mechanical Engineering, UMBC',
    email: 'schen@umbc.edu',
    researchFocus: [
      'Bio-inspired Helicoidal Bouligand Composites',
      'Multi-Material Photopolymer 3D Printing',
      'Instrumented Drop-Weight Impact Testing',
      'Atomistic Molecular Dynamics Simulations'
    ],
    bio: 'Synthesizing bio-inspired helicoidal architecture composites inspired by the mantis shrimp dactyl club, analyzing crack twisting mechanisms and energy dissipation under localized impact.',
    googleScholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Sarah+Chen+Bouligand+composites',
    researchGate: 'https://www.researchgate.net/search/researcher?q=Sarah+Chen+Bouligand',
    linkedin: 'https://www.linkedin.com/in/sarah-chen-materials',
    academicProfile: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Sarah+Chen+Bouligand+composites',
    currentProjects: [
      'Bio-inspired Helicoidal Composites: Compression & Impact Optimization',
      'High-Toughness Photopolymer 3D Lattice Fabrication'
    ],
    joinedYear: '2024',
    highlight: 'MSc Fellow · Experimental Additive Manufacturing Lead',
    status: 'Active'
  },
  {
    id: 'team-alumni-1',
    name: 'Marcus Vance',
    role: 'Affiliated Research Engineer (Alumnus)',
    category: 'alumni',
    affiliation: 'Johns Hopkins Applied Physics Laboratory (APL) & SWID-SHRK Alumnus',
    email: 'mvance@umbc.edu',
    researchFocus: [
      'Digital Image Correlation (DIC)',
      'Cohesive Zone Modeling (CZM)',
      'Quasi-Brittle Fracture Mechanics',
      'High-Speed Optical Metrology'
    ],
    bio: 'MSc graduate with honors (2024). Developed the lab stereoscopic 3D DIC optical tracking system and cohesive zone fracture models for reinforced composite interfaces. Currently Research Engineer at JHU/APL.',
    googleScholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Marcus+Vance+DIC+fracture',
    researchGate: 'https://www.researchgate.net/search/researcher?q=Marcus+Vance+fracture',
    linkedin: 'https://www.linkedin.com/in/marcus-vance-eng',
    academicProfile: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Marcus+Vance+DIC+fracture',
    currentProjects: [
      'Stereo DIC Full-Field Strain Tracking in Quasi-Brittle Materials'
    ],
    joinedYear: '2023',
    highlight: 'MSc Alumnus Defended with Honors · Now Research Engineer at APL',
    status: 'Alumni'
  }
];

export const INITIAL_LAB_UPDATES: LabUpdate[] = [
  {
    id: 'upd-2026-10-nsf',
    title: 'NSF CMMI Grant Awarded: Neural PINN Surrogates for Dynamic 3D Fracture Mechanics',
    date: 'October 14, 2026',
    isoDate: '2026-10-14',
    category: 'grant',
    categoryLabel: 'Grant Award',
    featured: true,
    summary: 'SWID-SHRK Lab received a $485,000 grant from the National Science Foundation (CMMI) to formulate Physics-Informed Neural Network surrogates that accelerate non-linear crack propagation simulations in aerospace panels by over 140x.',
    fullDetails: 'This 3-year collaborative grant focuses on embedding elastodynamic conservation equations and weight function formulations directly into deep neural network loss functions. The PINN surrogate predicts real-time stress intensity factor envelopes under multiaxial random thermo-mechanical vibration without requiring full transient mesh remeshing.',
    leadResearcher: 'Pouria Hejazi Rekavandi (PI)',
    coResearchers: ['Dr. Tariq Mansour', 'Elena Rostami'],
    externalUrl: 'https://www.nsf.gov/awardsearch/',
    externalUrlLabel: 'NSF Award Announcement',
    metrics: [
      { label: 'Award Funding', value: '$485,000' },
      { label: 'Program', value: 'NSF CMMI Mechanics' },
      { label: 'Speedup Factor', value: '140× FEA Acceleration' }
    ],
    tags: ['NSF Grant', 'PINNs', 'Fracture Mechanics', 'Aerospace Panels', 'Deep Learning']
  },
  {
    id: 'upd-2026-09-ijf',
    title: 'New Publication: Multiaxial Thermo-Mechanical Fatigue Life of Functionally Graded Cylinders',
    date: 'September 28, 2026',
    isoDate: '2026-09-28',
    category: 'publication',
    categoryLabel: 'Journal Publication',
    featured: true,
    summary: 'Our comprehensive research paper on weight function formulations for cracked hollow cylinders subjected to cyclic thermal shocks has been officially published in the International Journal of Fatigue (Q1, Elsevier).',
    fullDetails: 'The study presents an analytical-computational closed-form weight function derived for radial through-wall and part-through longitudinal cracks in graded metal-ceramic cylinders. Results are validated against 100+ thermo-mechanical Abaqus benchmark simulations and show <3% deviation from experimental thermal fatigue cycle counts.',
    leadResearcher: 'Pouria Hejazi Rekavandi',
    coResearchers: ['S. M. Nabavi'],
    externalUrl: 'https://doi.org/10.1016/j.ijfatigue.2026.107892',
    externalUrlLabel: 'Read on ScienceDirect (DOI: 10.1016/j.ijfatigue.2026.107892)',
    metrics: [
      { label: 'Journal', value: 'Int. J. Fatigue (Q1)' },
      { label: 'Impact Factor', value: '6.2' },
      { label: 'Error Margin', value: '< 2.8% vs Benchmark' }
    ],
    tags: ['Fracture Mechanics', 'Weight Functions', 'FGM Cylinders', 'Thermal Shock', 'Fatigue Life']
  },
  {
    id: 'upd-2026-08-shpb',
    title: 'High-Rate Neural Biomechanics: Sub-Millisecond Viscoelastic Testing at 1,200 s⁻¹',
    date: 'August 19, 2026',
    isoDate: '2026-08-19',
    category: 'experiment',
    categoryLabel: 'Experimental Trial',
    summary: 'Completed high-velocity split-Hopkinson pressure bar (SHPB) dynamic shear trials on porcine brain parenchyma tissue, capturing microsecond strain localization during simulated blast and blunt impact.',
    fullDetails: 'The captured dynamic shear stress-strain curves revealed pronounced non-linear strain-rate stiffening between 100 s⁻¹ and 1,200 s⁻¹. The data has been calibrated directly into our user-defined Fortran VUMAT subroutine in Abaqus/Explicit for realistic traumatic brain injury (TBI) head impact simulations.',
    leadResearcher: 'Alireza Karimi (PhD Candidate)',
    coResearchers: ['Pouria Hejazi Rekavandi'],
    metrics: [
      { label: 'Strain Rate', value: '1,200 s⁻¹' },
      { label: 'Technique', value: 'Polymeric SHPB' },
      { label: 'Subroutine', value: 'Fortran VUMAT' }
    ],
    tags: ['Neural Biomechanics', 'SHPB Testing', 'TBI Trauma', 'VUMAT Subroutine', 'Abaqus Explicit']
  },
  {
    id: 'upd-2026-07-lce',
    title: '3D AntiPrism Metamaterial Breakthrough: 3.2× Specific Energy Absorption Increase',
    date: 'July 08, 2026',
    isoDate: '2026-07-08',
    category: 'simulation',
    categoryLabel: 'Computational & Metamaterial',
    summary: 'Demonstrated that integrating Liquid Crystal Elastomer (LCE) bistable hinges with AntiPrism origami cells yields a 320% increase in mass-specific energy absorption under high-speed compressive impact.',
    fullDetails: 'Combining generative topological optimization with nonlinear multi-point contact in Abaqus/Explicit, the metamaterial structure dissipates shock energy via recoverable snap-through elastic buckling and dissipative molecular alignment without plastic catastrophic rupture.',
    leadResearcher: 'Elena Rostami (PhD Candidate)',
    coResearchers: ['Sarah Chen', 'Pouria Hejazi Rekavandi'],
    metrics: [
      { label: 'SEA Improvement', value: '+320% (3.2×)' },
      { label: 'Material System', value: 'LCE + AntiPrism' },
      { label: 'Reversibility', value: '> 98% Recovery' }
    ],
    tags: ['Metamaterials', 'AntiPrism Origami', 'LCE Elastomers', 'Shock Absorption', 'Abaqus']
  },
  {
    id: 'upd-2026-06-asme',
    title: 'Invited Keynote at ASME International Mechanical Engineering Congress (IMECE 2026)',
    date: 'June 22, 2026',
    isoDate: '2026-06-22',
    category: 'conference',
    categoryLabel: 'Keynote & Conference',
    summary: 'PI Pouria Hejazi Rekavandi delivered an invited keynote in the Fracture and Failure of Advanced Materials symposium, presenting our unified weight function framework and recent neural biomechanics insights.',
    fullDetails: 'The plenary talk highlighted how computational mechanics, coupled with modern scientific machine learning, bridges microstructural damage initiation and macroscopic component residual strength in next-generation aerospace and biomedical systems.',
    leadResearcher: 'Pouria Hejazi Rekavandi',
    externalUrl: 'https://event.asme.org/IMECE',
    externalUrlLabel: 'ASME IMECE Program Archive',
    metrics: [
      { label: 'Congress', value: 'ASME IMECE 2026' },
      { label: 'Track', value: 'Mechanics & Materials' }
    ],
    tags: ['ASME', 'IMECE', 'Keynote Lecture', 'Mechanics Community', 'Symposium']
  },
  {
    id: 'upd-2026-05-dic',
    title: 'Stereo-DIC Optical Metrology Deployed for Cementitious Crack Localization',
    date: 'May 11, 2026',
    isoDate: '2026-05-11',
    category: 'experiment',
    categoryLabel: 'Experimental Trial',
    summary: 'Successfully calibrated high-resolution stereoscopic 3D Digital Image Correlation (DIC) system for capturing full-field displacement discontinuities and fracture process zones in fiber-reinforced cement matrices.',
    fullDetails: 'The optical rig achieves sub-pixel displacement resolution of 0.01 pixels at 250 frames per second, allowing quantitative tracking of cohesive crack bridging laws and fracture energy dissipation prior to ultimate specimen separation.',
    leadResearcher: 'Marcus Vance',
    coResearchers: ['Pouria Hejazi Rekavandi'],
    metrics: [
      { label: 'Resolution', value: '0.01 pixel' },
      { label: 'Frame Rate', value: '250 fps Stereo' },
      { label: 'Measurement', value: 'Full-Field Strain ε_xx, ε_yy' }
    ],
    tags: ['DIC Metrology', 'Quasi-Brittle', 'Fiber Cements', 'Optical Strain', 'Fracture Energy']
  },
  {
    id: 'upd-2026-04-toolbox',
    title: 'Open Source Release: SWID-SHRK Python & Fortran Fracture Mechanics Toolbox',
    date: 'April 03, 2026',
    isoDate: '2026-04-03',
    category: 'milestone',
    categoryLabel: 'Open Source Software',
    summary: 'Released version 1.2 of our open-source research toolbox for automated stress intensity factor computation, weight function integration, and Abaqus INP input file generator on GitHub.',
    fullDetails: 'The repository provides verified scripts for computing Mode I and Mode II stress intensity factors ($K_I$, $K_{II}$) in cracked cylinders, extracting nodal J-integrals from Abaqus ODB output databases, and executing hyper-viscoelastic material calibrations.',
    leadResearcher: 'SWID-SHRK Computational Group',
    externalUrl: 'https://github.com/pouriarekavandi/SWID',
    externalUrlLabel: 'View GitHub Repository',
    metrics: [
      { label: 'Toolbox Version', value: 'v1.2.0' },
      { label: 'Languages', value: 'Python 3.11 & Fortran 90' },
      { label: 'License', value: 'MIT Open Research' }
    ],
    tags: ['Open Source', 'Python Toolbox', 'Fortran VUMAT', 'ODB Extraction', 'SIF Calculator']
  }
];

