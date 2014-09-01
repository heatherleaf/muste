#!/usr/bin/perl

@bases = qw/ Grasp GraspLex GraspSyntax /;
$fromlang = "Eng";

die <<USAGE unless $#ARGV==0 && $ARGV[0] =~ /^[A-Z][a-z]+$/;
Usage: perl $0 new-language (e.g., "Swe", "Fin", ... [A-Z][a-z]+)
USAGE

$tolang = $ARGV[0];

@files = map {"$_$tolang"} @bases;
print <<XXX;
The following files will be created:
  @files
Is that ok?
XXX

$answer = <STDIN>;
chomp $answer;

die "As you wish, not doing..." unless $answer =~ /^y(es)?$/i;

for $f (@bases) {
  $cmd = "perl -pe 's/$fromlang/$tolang/g' $f$fromlang.gf > $f$tolang.gf";
  print $cmd, "\n";
  system $cmd;
}

print "Now remember to edit the file GraspLex$tolang.gf\n";

