import { HStack, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";

export default function AvatarDropdownSkeleton() {
  return (
    <Stack gap="6">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
    </Stack>
  );
}
