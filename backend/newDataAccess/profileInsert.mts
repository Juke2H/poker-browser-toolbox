


  //Inserts a row of values from the profile object
  // Promise<RangeProfileRow>

  
//   async insertProfile(profile: NewRangeProfile): Promise<any> {
//     const { data, error } = await this.database
//       .from("range_profiles")
//       .insert([
//         { profile_name: `${profile.profile_name}` },
//         { description: `${profile.description}` },
//         { range_type: `${profile.range_type}` },
//         { game_type: `${profile.game_type}` },
//         { stack_size: `${profile.stack_size}` },
//         { position: `${profile.position}` },
//         { is_template: `${profile.is_template}` },
//         { owner_id: `${profile.owner_id}` },
//       ])
//       .select();
//     if (error) {
//       throw error;
//     } else {
//       return data;
//     }
//   }