
interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  instructions: string[];
  image: string;
  targetMuscles: string[];
}

export const exercises: Exercise[] = [
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Lower Body",
    description: "The leg press is a compound weight training exercise in which the individual pushes a weight away from them using their legs.",
    benefits: [
      "Builds quadriceps, hamstrings, and glute strength",
      "Allows for heavy loading with reduced lower back stress",
      "Effective for building overall lower body mass",
      "Suitable for beginners and advanced lifters",
      "Can be modified to target specific leg muscles"
    ],
    instructions: [
      "Sit on the leg press machine with your back against the padded support",
      "Place your feet shoulder-width apart on the platform",
      "Release the safety locks and lower the platform by bending your knees",
      "Lower until your knees form approximately a 90-degree angle",
      "Push through your heels to extend your legs without locking your knees",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes"]
  },
  {
    id: "squats",
    name: "Squats",
    category: "Lower Body",
    description: "The squat is a compound exercise that trains primarily the muscles of the thighs, hips, and buttocks, as well as strengthening the bones, ligaments, and tendons throughout the lower body.",
    benefits: [
      "Strengthens the entire lower body",
      "Improves core stability and strength",
      "Increases functional fitness for daily activities",
      "Boosts hormone production",
      "Burns calories efficiently"
    ],
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and back straight",
      "Bend at the knees and hips, lowering your body as if sitting in a chair",
      "Keep your knees in line with your toes, not extending past them",
      "Lower until your thighs are parallel to the ground (or as low as comfortable)",
      "Push through your heels to return to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1566241142404-6c2bb4201a30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Core"]
  },
  {
    id: "bench-press",
    name: "Bench Press",
    category: "Upper Body",
    description: "The bench press is a compound exercise that targets the muscles of the upper body. It involves lying on a bench and pressing weight upward using either a barbell or dumbbells.",
    benefits: [
      "Builds chest, shoulder, and tricep strength",
      "Increases upper body mass",
      "Improves pushing strength for everyday activities",
      "Develops balanced chest development",
      "Enhances overall upper body aesthetics"
    ],
    instructions: [
      "Lie flat on a bench with feet firmly on the ground",
      "Grip the barbell slightly wider than shoulder-width apart",
      "Unrack the barbell and position it over your chest with arms extended",
      "Lower the barbell slowly to the mid-chest",
      "Press the barbell back up to the starting position, fully extending your arms",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1534368786749-b63e04c1e84f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Chest", "Shoulders", "Triceps"]
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "Upper Body",
    description: "The incline bench press is a variation of the flat bench press performed on an inclined bench. This exercise shifts the focus to the upper chest and anterior deltoids.",
    benefits: [
      "Emphasizes upper chest development",
      "Targets the anterior deltoids more than flat bench",
      "Creates a more balanced chest appearance",
      "Provides variety in chest training",
      "Helps develop pushing strength at different angles"
    ],
    instructions: [
      "Set an adjustable bench to a 30-45 degree incline",
      "Lie on the bench with feet planted firmly on the floor",
      "Grip the barbell slightly wider than shoulder-width",
      "Unrack the barbell and hold it above your upper chest with arms extended",
      "Lower the barbell to your upper chest in a controlled manner",
      "Press the weight back up until your arms are fully extended",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Upper Chest", "Anterior Deltoids", "Triceps"]
  },
  {
    id: "tricep-extension-rope",
    name: "Tricep Extension (Rope)",
    category: "Upper Body",
    description: "The rope tricep extension is an isolation exercise that targets the triceps. It's performed using a cable machine with a rope attachment, focusing on the extension of the elbow joint.",
    benefits: [
      "Isolates the triceps muscles effectively",
      "Provides constant tension throughout the movement",
      "Allows for a greater range of motion",
      "The rope allows for natural wrist positioning",
      "Helps develop defined triceps"
    ],
    instructions: [
      "Attach a rope to a high pulley on a cable machine",
      "Face the machine, grasp the rope with both hands, and stand upright with a slight forward lean",
      "Start with your elbows bent at 90 degrees, tucked close to your sides",
      "While keeping your upper arms stationary, extend your forearms downward until arms are fully extended",
      "Slowly return to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Triceps"]
  },
  {
    id: "tricep-extension-rod",
    name: "Tricep Extension (Rod)",
    category: "Upper Body",
    description: "The tricep extension with a straight bar (rod) is an isolation exercise targeting the triceps muscles. It's performed using a cable machine with a straight bar attachment.",
    benefits: [
      "Targets all three heads of the triceps",
      "The straight bar allows for heavier loading",
      "Provides constant tension on the triceps",
      "Helps develop arm definition and strength",
      "Improves lockout strength for pressing movements"
    ],
    instructions: [
      "Attach a straight bar to a high pulley on a cable machine",
      "Face the machine, grasp the bar with an overhand grip, hands 8-12 inches apart",
      "Stand upright with a slight forward lean, keeping elbows close to your head",
      "Starting with your elbows bent, extend your arms downward until fully straight",
      "Slowly return to the starting position, keeping tension on the triceps",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1598575285627-d1ded1b50b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Triceps"]
  },
  {
    id: "tricep-overhead-press",
    name: "Tricep Overhead Press",
    category: "Upper Body",
    description: "The tricep overhead press is an isolation exercise that targets the long head of the triceps muscle. It can be performed with a dumbbell, cable, or resistance band.",
    benefits: [
      "Emphasizes the long head of the triceps",
      "Stretches the triceps under load for better development",
      "Improves overhead pressing stability",
      "Adds variety to triceps training",
      "Can be performed with minimal equipment"
    ],
    instructions: [
      "Stand or sit with a dumbbell held in both hands",
      "Raise the dumbbell overhead with arms fully extended",
      "Keeping upper arms close to your head, lower the weight behind your head by bending at the elbows",
      "Lower until you feel a stretch in your triceps",
      "Extend your arms to raise the weight back to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1597452485671-d1f69b2e3d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Triceps (Long Head)"]
  },
  {
    id: "shoulder-press",
    name: "Shoulder Press",
    category: "Upper Body",
    description: "The shoulder press, also known as the overhead press, is a compound exercise that targets the deltoid muscles of the shoulder, as well as the triceps and upper chest.",
    benefits: [
      "Builds stronger and broader shoulders",
      "Strengthens the entire shoulder girdle",
      "Improves overhead strength for functional activities",
      "Engages core stabilizers",
      "Can be performed with various equipment (barbell, dumbbells, machines)"
    ],
    instructions: [
      "Sit or stand with a straight back and core engaged",
      "Hold dumbbells at shoulder height with palms facing forward",
      "Press the weights overhead until your arms are fully extended",
      "Briefly pause at the top",
      "Lower the weights back to shoulder level in a controlled manner",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Deltoids", "Triceps", "Upper Chest", "Trapezius"]
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "Lower Body",
    description: "The leg extension is an isolation exercise that targets the quadriceps muscles. It's performed on a leg extension machine and involves extending the knee joint against resistance.",
    benefits: [
      "Isolates and strengthens the quadriceps",
      "Useful for rehabilitation after knee injuries",
      "Helps develop definition in the front of the thighs",
      "Can be used for high-rep endurance training",
      "Minimal technical skill required"
    ],
    instructions: [
      "Sit on a leg extension machine with back firmly against the pad",
      "Adjust the pad so it rests on your lower shins just above the feet",
      "Grasp the side handles for stability",
      "Extend your legs to lift the weight until your knees are fully extended (but not locked)",
      "Pause briefly at the top of the movement",
      "Lower the weight back to the starting position in a controlled manner",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Quadriceps"]
  },
  {
    id: "hamstring-curls",
    name: "Hamstring Curls",
    category: "Lower Body",
    description: "Hamstring curls, also known as leg curls, are an isolation exercise that targets the hamstring muscles. They're typically performed on a dedicated machine and involve flexing the knee joint against resistance.",
    benefits: [
      "Isolates and strengthens the hamstrings",
      "Helps balance quadriceps development",
      "Improves knee joint stability",
      "Supports lower body power for activities like sprinting and jumping",
      "Can help prevent hamstring injuries"
    ],
    instructions: [
      "Lie face down on a leg curl machine with the pad positioned just above your heels",
      "Grasp the handles for stability",
      "Keep your hips pressed into the bench",
      "Curl your legs up by bending at the knees, bringing your heels toward your buttocks",
      "Squeeze your hamstrings at the top of the movement",
      "Lower your legs back to the starting position in a controlled manner",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Hamstrings", "Calves (partially)"]
  }
];
