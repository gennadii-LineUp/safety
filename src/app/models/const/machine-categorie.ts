import { Injectable } from '@angular/core';

@Injectable()
export class MachinesGlossary {

  TypeM = [
    { value: '3', display: 'VL' },
    { value: '4', display: 'PL' },
    { value: '5', display: 'Remorque' },
    { value: '6', display: 'Chariots élévateurs R.389' },
    { value: '7', display: 'PEMP (nacelle) R.386' },
    { value: '8', display: 'Ponts roulants R.318/423' },
    { value: '9', display: 'Engins de chantier R.372m' },
    { value: '10', display: 'Grues auxiliaire R.390' },
    { value: '11', display: 'Grues à tour R.377m' },
    { value: '12', display: 'Grues mobiles R.383m' }
  ];

  types_1_vehicule = [
    { id: 3,  display: 'VL' },
    { id: 4,  display: 'PL' },
    { id: 5,  display: 'Remorque' }
  ];


  types_2_engins_6_9 = [
    { id: 6,  display: 'Chariots élévateurs R.389' },
    { id: 7,  display: 'PEMP (nacelle) R.386' },
    { id: 8,  display: 'Ponts roulants R.318/423' },
    { id: 9,  display: 'Engins de chantier R.372m' }
  ];
  types_2_engins_10 = [
    { id: 10,  display: 'Grues auxiliaire R.390' }
  ];
  types_2_engins_11_12 = [
    { id: 11,  display: 'Grues à tour R.377m' },
    { id: 12,  display: 'Grues mobiles R.383m' }
  ];


  types_2_engins_6 = [
    { id: 13, parent: 6,  display: 'Catégorie 1 : transpalette à conducteur porté' },
    { id: 14, parent: 6,  display: 'Catégorie 2 : tracteur ou porteur cap. max. 6t' },
    { id: 15, parent: 6,  display: 'Catégorie 3 : porte-à-faux cap. max. 6t' },
    { id: 16, parent: 6,  display: 'Catégorie 4 : porte-à-faux cap. + 6t' },
    { id: 17, parent: 6,  display: 'Catégorie 5 : mat rétractable' },
    { id: 18, parent: 6,  display: 'Catégorie 6 : conduite hors production' },
    { id: 19, parent: 6,  display: 'Complément de formation engins spéciaux (5+)' }
  ];

  types_2_engins_7 = [
    { id: 20, parent: 7,  display: 'Catégorie 1/A : stabilisée, élévation verticale' },
    { id: 21, parent: 7,  display: 'Catégorie 1/B : stabilisée, élévation multidirectionnelle' },
    { id: 22, parent: 7,  display: 'Catégorie 2/A : sur véhicule roulant, élévation verticale' },
    { id: 23, parent: 7,  display: 'Catégorie 2/B : sur véhicule roulant, élévation multidirectionnelle' },
    { id: 24, parent: 7,  display: 'Catégorie 3/A : automotrice, élévation verticale' },
    { id: 25, parent: 7,  display: 'Catégorie 3/B : automotrice, élévation multidirectionnelle' }
  ];

  types_2_engins_8 = [
    { id: 26, parent: 8,  display: 'Cabine' },
    { id: 27, parent: 8,  display: 'Conduite au sol : filaire, télécommande, radiocommande' }
  ];

  types_2_engins_9 = [
    { id: 28, parent: 9,  display: 'Catégorie 1 : tracteurs et petits engins de chantier mobiles' },
    { id: 29, parent: 9,  display: 'Catégorie 2 : engins d’extraction et/ou de chargement à déplacement séquentiel' },
    { id: 30, parent: 9,  display: 'Catégorie 3 : engins d’extraction à déplacement alternatif' },
    { id: 31, parent: 9,  display: 'Catégorie 4 : engins de chargement à déplacement alternatif' },
    { id: 32, parent: 9,  display: 'Catégorie 5 : engins de finition à déplacement lent' },
    { id: 33, parent: 9,  display: 'Catégorie 6 : engins de réglage à déplacement alternatif' },
    { id: 34, parent: 9,  display: 'Catégorie 7 : engins de compactage à déplacement alternatif' },
    { id: 35, parent: 9,  display: 'Catégorie 8 : engins de transport ou d’extraction-transport' },
    { id: 36, parent: 9,  display: 'Catégorie 9 : engins de manutention' },
    { id: 37, parent: 9,  display: 'Catégorie 10 : conduite hors production' }
  ];

  // types_2_engins_10 = [
  //   { id: ,  display: '' }
  // ];

  types_2_engins_11 = [
    { id: 38, parent: 11,  display: 'Grue à montage automatisé conduite au sol' },
    { id: 39, parent: 11,  display: 'Grue à montage automatisé conduite en cabine' },
    { id: 40, parent: 11,  display: 'Grue à montage par éléments' }
  ];


  types_2_engins_12_routier = [
    { id: 41, parent: 12,  display: 'Automotrice immatriculée' },
    { id: 42, parent: 12,  display: 'Automotrice non immatriculée' },
    { id: 43, parent: 12,  display: 'Sur porteur automoteur' },
    { id: 44, parent: 12,  display: 'Tractée' }
  ];
  types_2_engins_12_nonRoutier = [
    { id: 45, parent: 12,  display: 'Sur chenilles' },
    { id: 46, parent: 12,  display: 'Sur bandage ou rail' },
    { id: 47, parent: 12,  display: 'Sur ponton' }
  ];
  types_2_engins_12_equipement = [
    { id: 1,  parent: 12,  display: 'A - Treillis' },
    { id: 2,  parent: 12,  display: 'B - Télescopique avec fléchette' },
    { id: 3,  parent: 12,  display: 'B - Télescopique sans fléchette' },
    { id: 4,  parent: 12,  display: 'C - Spécial' }
  ];


}
