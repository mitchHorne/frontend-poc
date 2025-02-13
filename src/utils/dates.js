export function checkExpired(certifications) {
  const today = new Date();
  const todayPlusThreeMonths = new Date(
    new Date(today).setMonth(today.getMonth() + 3)
  );

  const almostExpiry = certifications.some((cert) => {
    if (!cert) return false;
    return new Date(cert) < todayPlusThreeMonths;
  });
  const expired = certifications.some((cert) => {
    if (!cert) return false;
    return new Date(cert) < today;
  });

  return expired ? "Expired" : almostExpiry ? "Expiring" : "Valid";
}
